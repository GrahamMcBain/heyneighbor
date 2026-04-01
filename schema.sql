-- HeyNeighbor Geographic Content Management Schema
-- PostgreSQL schema for Directus CMS with geographic hierarchy and permissions

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Geographic regions hierarchy table
CREATE TABLE regions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('country', 'state', 'city', 'neighborhood')),
    parent_id UUID REFERENCES regions(id) ON DELETE CASCADE,
    
    -- Geographic data
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    timezone VARCHAR(100),
    population INTEGER,
    
    -- SEO and metadata
    description TEXT,
    metadata JSONB DEFAULT '{}',
    
    -- Tracking
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique slugs per parent level
    UNIQUE(parent_id, slug)
);

-- Create index for geographic queries
CREATE INDEX idx_regions_parent_id ON regions(parent_id);
CREATE INDEX idx_regions_type ON regions(type);
CREATE INDEX idx_regions_slug ON regions(slug);
CREATE INDEX idx_regions_location ON regions USING GIST(ST_Point(longitude, latitude)) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- Content templates for different types of location-based pages
CREATE TABLE content_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    
    -- Template configuration
    template_type VARCHAR(100) NOT NULL, -- 'block_party', 'community_guide', 'local_events', etc.
    content_schema JSONB NOT NULL DEFAULT '{}', -- JSON schema for required/optional fields
    default_content JSONB DEFAULT '{}', -- Default content structure
    
    -- SEO template
    title_template VARCHAR(500), -- "How to throw a {{event_type}} in {{city_name}}"
    meta_description_template VARCHAR(500),
    
    -- Status
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Location-specific pages combining templates with regional data
CREATE TABLE pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    region_id UUID NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
    template_id UUID NOT NULL REFERENCES content_templates(id) ON DELETE RESTRICT,
    
    -- Page content
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    content JSONB NOT NULL DEFAULT '{}', -- Overrides/customizations from template
    excerpt TEXT,
    
    -- SEO
    meta_title VARCHAR(500),
    meta_description VARCHAR(500),
    meta_keywords TEXT[],
    og_image_url VARCHAR(500),
    
    -- Publishing
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    featured BOOLEAN DEFAULT FALSE,
    
    -- Author tracking
    created_by UUID, -- References directus_users
    updated_by UUID, -- References directus_users
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one page per template per region
    UNIQUE(region_id, template_id)
);

CREATE INDEX idx_pages_region_id ON pages(region_id);
CREATE INDEX idx_pages_template_id ON pages(template_id);
CREATE INDEX idx_pages_status ON pages(status);
CREATE INDEX idx_pages_published_at ON pages(published_at) WHERE status = 'published';
CREATE INDEX idx_pages_slug ON pages(slug);

-- User region assignments for geographic permissions
CREATE TABLE user_regions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- References directus_users(id)
    region_id UUID NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
    
    -- Permission level for this region
    permission_level VARCHAR(50) DEFAULT 'editor' CHECK (
        permission_level IN ('viewer', 'editor', 'admin', 'owner')
    ),
    
    -- Whether they can manage child regions
    can_manage_children BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, region_id)
);

CREATE INDEX idx_user_regions_user_id ON user_regions(user_id);
CREATE INDEX idx_user_regions_region_id ON user_regions(region_id);

-- Function to get all descendant regions for permission checks
CREATE OR REPLACE FUNCTION get_descendant_regions(parent_region_id UUID)
RETURNS TABLE(region_id UUID) AS $$
WITH RECURSIVE region_tree AS (
    -- Base case: the parent region itself
    SELECT id FROM regions WHERE id = parent_region_id
    
    UNION ALL
    
    -- Recursive case: children of regions in the tree
    SELECT r.id 
    FROM regions r
    INNER JOIN region_tree rt ON r.parent_id = rt.id
)
SELECT id FROM region_tree;
$$ LANGUAGE SQL STABLE;

-- Function to get user's accessible regions (including descendants if allowed)
CREATE OR REPLACE FUNCTION get_user_accessible_regions(user_uuid UUID)
RETURNS TABLE(region_id UUID) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT r.region_id
    FROM (
        -- Direct region assignments
        SELECT ur.region_id
        FROM user_regions ur
        WHERE ur.user_id = user_uuid
        
        UNION ALL
        
        -- Child regions if can_manage_children is true
        SELECT dr.region_id
        FROM user_regions ur
        CROSS JOIN LATERAL get_descendant_regions(ur.region_id) dr
        WHERE ur.user_id = user_uuid AND ur.can_manage_children = TRUE
    ) r;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Sample data for initial setup
INSERT INTO regions (name, slug, type) VALUES 
('United States', 'united-states', 'country');

-- Sample states
INSERT INTO regions (name, slug, type, parent_id) 
SELECT 'Illinois', 'illinois', 'state', id FROM regions WHERE slug = 'united-states';

INSERT INTO regions (name, slug, type, parent_id) 
SELECT 'California', 'california', 'state', id FROM regions WHERE slug = 'united-states';

INSERT INTO regions (name, slug, type, parent_id) 
SELECT 'Texas', 'texas', 'state', id FROM regions WHERE slug = 'united-states';

INSERT INTO regions (name, slug, type, parent_id) 
SELECT 'Missouri', 'missouri', 'state', id FROM regions WHERE slug = 'united-states';

-- Sample cities
INSERT INTO regions (name, slug, type, parent_id, latitude, longitude, timezone, population) 
SELECT 'Chicago', 'chicago', 'city', id, 41.8781, -87.6298, 'America/Chicago', 2700000 
FROM regions WHERE slug = 'illinois';

INSERT INTO regions (name, slug, type, parent_id, latitude, longitude, timezone, population) 
SELECT 'Los Angeles', 'los-angeles', 'city', id, 34.0522, -118.2437, 'America/Los_Angeles', 3900000 
FROM regions WHERE slug = 'california';

INSERT INTO regions (name, slug, type, parent_id, latitude, longitude, timezone, population) 
SELECT 'Austin', 'austin', 'city', id, 30.2672, -97.7431, 'America/Chicago', 950000 
FROM regions WHERE slug = 'texas';

INSERT INTO regions (name, slug, type, parent_id, latitude, longitude, timezone, population) 
SELECT 'Kansas City', 'kansas-city', 'city', id, 39.0997, -94.5786, 'America/Chicago', 490000 
FROM regions WHERE slug = 'missouri';

-- Sample content templates
INSERT INTO content_templates (
    name, 
    slug, 
    description, 
    template_type,
    title_template,
    meta_description_template,
    content_schema
) VALUES (
    'Fourth of July Block Party Guide',
    'fourth-of-july-block-party',
    'Template for creating Fourth of July block party guides for specific cities',
    'event_guide',
    'How to Throw an Epic Fourth of July Block Party in {{city_name}}',
    'Complete guide to organizing a Fourth of July block party in {{city_name}}. Permits, planning, activities, and local tips.',
    '{
        "required_fields": ["permits_info", "local_vendors", "activity_suggestions"],
        "optional_fields": ["historical_context", "weather_tips", "safety_guidelines"],
        "field_types": {
            "permits_info": "rich_text",
            "local_vendors": "array",
            "activity_suggestions": "rich_text",
            "historical_context": "rich_text",
            "weather_tips": "rich_text",
            "safety_guidelines": "rich_text"
        }
    }'::jsonb
);

INSERT INTO content_templates (
    name, 
    slug, 
    description, 
    template_type,
    title_template,
    meta_description_template,
    content_schema
) VALUES (
    'Community Building Guide',
    'community-building-guide',
    'Template for the 10-step community building system customized by location',
    'guide',
    '10 Steps to Build Community in {{city_name}}',
    'Transform your {{city_name}} neighborhood into a thriving community with this proven 10-step system.',
    '{
        "required_fields": ["local_examples", "contact_info", "meetup_locations"],
        "optional_fields": ["success_stories", "local_resources", "city_specific_tips"],
        "field_types": {
            "local_examples": "rich_text",
            "contact_info": "json",
            "meetup_locations": "array",
            "success_stories": "rich_text",
            "local_resources": "array",
            "city_specific_tips": "rich_text"
        }
    }'::jsonb
);

-- Update timestamp triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_regions_updated_at
    BEFORE UPDATE ON regions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_templates_updated_at
    BEFORE UPDATE ON content_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at
    BEFORE UPDATE ON pages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_regions_updated_at
    BEFORE UPDATE ON user_regions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
