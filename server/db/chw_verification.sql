-- 1. National Health Professional Registry
CREATE TABLE IF NOT EXISTS health_professionals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professional_id TEXT UNIQUE NOT NULL, -- e.g., CHW-KE-8821
    full_name TEXT NOT NULL,
    level TEXT NOT NULL, -- 'Level 1', 'Level 2', etc.
    education TEXT NOT NULL, -- 'Diploma in Community Health', etc.
    specialization TEXT NOT NULL, -- 'Maternal Health', 'Nutrition', etc.
    hospital_name TEXT NOT NULL,
    hospital_location TEXT NOT NULL,
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Seed some real-world sample data for testing
INSERT INTO health_professionals (professional_id, full_name, level, education, specialization, hospital_name, hospital_location)
VALUES 
('CHW-KE-2026-001', 'Jane Wambui', 'Level 4 (CHEW)', 'Higher Diploma in Community Health', 'Maternal & Child Health', 'Kiambu Level 5 Hospital', 'Kiambu Town'),
('CHW-KE-2026-002', 'David Kipchoge', 'Level 3 (CHV)', 'Certificate in Public Health', 'Infectious Diseases', 'Nandi Hills Sub-County Hospital', 'Nandi Hills')
ON CONFLICT (professional_id) DO NOTHING;
