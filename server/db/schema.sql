-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ROLES
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE, -- 'Doctor', 'Nurse', 'Admin', 'CHW', 'Pharmacist', 'MinistryAnalyst'
    permissions JSONB DEFAULT '{}'::jsonb
);

-- HOSPITALS (Facilities)
CREATE TABLE hospitals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'National Referral', 'County Referral', 'Dispensary', 'Clinic'
    location TEXT,
    county TEXT NOT NULL,
    contact_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- USERS (Extends Supabase Auth users or standalone)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Link to auth.users.id if using Supabase Auth
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role_id UUID REFERENCES roles(id),
    hospital_id UUID REFERENCES hospitals(id), -- Nullable for Ministry Analysts
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PATIENTS (National ID / Health ID)
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    digital_health_id TEXT UNIQUE NOT NULL, -- e.g., KEN-123456
    name TEXT NOT NULL,
    dob DATE NOT NULL,
    gender TEXT,
    contact TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MEDICAL RECORDS (Module 1)
CREATE TABLE medical_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES users(id),
    diagnosis TEXT NOT NULL,
    notes TEXT,
    visit_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LAB RESULTS (Module 1)
CREATE TABLE lab_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    test_type TEXT NOT NULL,
    result TEXT NOT NULL,
    lab_technician_id UUID REFERENCES users(id),
    test_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'Pending' -- 'Pending', 'Completed'
);

-- PRESCRIPTIONS (Module 1)
CREATE TABLE prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES users(id),
    medication_name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    status TEXT DEFAULT 'Active', -- 'Active', 'Completed', 'Cancelled'
    prescribed_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HOSPITAL CAPACITY (Module 2)
CREATE TABLE hospital_capacity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hospital_id UUID REFERENCES hospitals(id) ON DELETE CASCADE UNIQUE,
    total_beds INT DEFAULT 0,
    available_beds INT DEFAULT 0,
    icu_beds INT DEFAULT 0,
    available_icu_beds INT DEFAULT 0,
    specialists_available JSONB DEFAULT '[]'::jsonb, -- List of available specialists
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- REFERRALS (Module 2)
CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id),
    referring_hospital_id UUID REFERENCES hospitals(id),
    receiving_hospital_id UUID REFERENCES hospitals(id),
    reason TEXT NOT NULL,
    priority TEXT DEFAULT 'Normal', -- 'Normal', 'Urgent', 'Emergency'
    status TEXT DEFAULT 'Pending', -- 'Pending', 'Accepted', 'Rejected', 'Completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DRUG INVENTORY (Module 4)
CREATE TABLE drug_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hospital_id UUID REFERENCES hospitals(id) ON DELETE CASCADE,
    drug_name TEXT NOT NULL,
    batch_number TEXT,
    quantity INT DEFAULT 0,
    min_threshold INT DEFAULT 10,
    expiry_date DATE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DRUG REDISTRIBUTION (Module 4)
CREATE TABLE drug_redistribution (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_hospital_id UUID REFERENCES hospitals(id),
    target_hospital_id UUID REFERENCES hospitals(id),
    drug_name TEXT NOT NULL,
    quantity INT NOT NULL,
    status TEXT DEFAULT 'Requested', -- 'Requested', 'In Transit', 'Received'
    request_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CHW REPORTS (Module 5)
CREATE TABLE chw_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chw_id UUID REFERENCES users(id),
    patient_id UUID REFERENCES patients(id), -- Can be null if patient not registered
    visit_type TEXT, -- 'Routine', 'Emergency', 'Follow-up'
    symptoms TEXT,
    vitals JSONB, -- { "bp": "120/80", "temp": 37.5 }
    location_lat FLOAT,
    location_lng FLOAT,
    visit_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- VACCINATIONS (Module 5)
CREATE TABLE vaccinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    vaccine_name TEXT NOT NULL,
    dose_number INT DEFAULT 1,
    administered_by UUID REFERENCES users(id),
    date_administered TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DISEASE REPORTS (Module 3 & Future AI Module)
CREATE TABLE disease_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    disease_name TEXT NOT NULL,
    cases_count INT DEFAULT 1,
    location TEXT NOT NULL, -- County or Sub-county
    reporter_id UUID REFERENCES users(id),
    report_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'Reported' -- 'Reported', 'Verified', 'Resolved'
);

-- SEED DATA (Optional - Uncomment to use)
-- INSERT INTO roles (name) VALUES ('Doctor'), ('Nurse'), ('Admin'), ('CHW'), ('Pharmacist');
