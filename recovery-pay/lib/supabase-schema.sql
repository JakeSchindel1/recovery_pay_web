-- Themes table
CREATE TABLE IF NOT EXISTS themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  light_variant JSONB NOT NULL,
  dark_variant JSONB NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  organization_id UUID,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for themes
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to select their own themes or themes from their organization
CREATE POLICY "Users can view their own themes or organization themes"
  ON themes
  FOR SELECT
  USING (
    created_by = auth.uid() OR
    organization_id IN (
      SELECT organization_id FROM user_organizations WHERE user_id = auth.uid()
    )
  );

-- Policy to allow users to insert their own themes
CREATE POLICY "Users can insert their own themes"
  ON themes
  FOR INSERT
  WITH CHECK (created_by = auth.uid());

-- Policy to allow users to update their own themes
CREATE POLICY "Users can update their own themes"
  ON themes
  FOR UPDATE
  USING (created_by = auth.uid());

-- Policy to allow users to delete their own themes
CREATE POLICY "Users can delete their own themes"
  ON themes
  FOR DELETE
  USING (created_by = auth.uid());

-- User theme preferences table
CREATE TABLE IF NOT EXISTS user_theme_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  theme_id UUID REFERENCES themes(id),
  is_dark_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for user theme preferences
ALTER TABLE user_theme_preferences ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to select their own theme preferences
CREATE POLICY "Users can view their own theme preferences"
  ON user_theme_preferences
  FOR SELECT
  USING (user_id = auth.uid());

-- Policy to allow users to insert their own theme preferences
CREATE POLICY "Users can insert their own theme preferences"
  ON user_theme_preferences
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Policy to allow users to update their own theme preferences
CREATE POLICY "Users can update their own theme preferences"
  ON user_theme_preferences
  FOR UPDATE
  USING (user_id = auth.uid());

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update the updated_at timestamp
CREATE TRIGGER update_themes_updated_at
BEFORE UPDATE ON themes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_theme_preferences_updated_at
BEFORE UPDATE ON user_theme_preferences
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS themes_organization_id_idx ON themes(organization_id);
CREATE INDEX IF NOT EXISTS themes_created_by_idx ON themes(created_by); 