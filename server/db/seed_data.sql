-- Seed Roles
INSERT INTO roles (name) VALUES 
('Doctor'), ('Nurse'), ('Admin'), ('CHW'), ('Pharmacist'), ('MinistryAnalyst')
ON CONFLICT (name) DO NOTHING;

-- Seed Hospitals
INSERT INTO hospitals (name, type, county, location) VALUES
('Kenyatta National Hospital', 'National Referral', 'Nairobi', 'Upper Hill'),
('Moi Teaching & Referral Hospital', 'National Referral', 'Uasin Gishu', 'Eldoret'),
('Coast General Hospital', 'County Referral', 'Mombasa', 'Mombasa Island'),
('Kisumu County Referral', 'County Referral', 'Kisumu', 'Kisumu City'),
('Nakuru Level 5 Hospital', 'County Referral', 'Nakuru', 'Nakuru City'),
('Garissa County Referral', 'County Referral', 'Garissa', 'Garissa Town')
ON CONFLICT DO NOTHING;

-- Seed Patients
INSERT INTO patients (digital_health_id, name, dob, gender, county) VALUES
('KEN-2024-001', 'John Kamau', '1980-05-15', 'Male', 'Nairobi'),
('KEN-2024-002', 'Mary Otieno', '1992-08-22', 'Female', 'Kisumu'),
('KEN-2024-003', 'Hassan Ali', '1965-11-10', 'Male', 'Mombasa'),
('KEN-2024-004', 'Grace Wambui', '1988-03-25', 'Female', 'Nyeri'),
('KEN-2024-005', 'Peter Odhiambo', '1955-07-12', 'Male', 'Homa Bay')
ON CONFLICT (digital_health_id) DO NOTHING;

-- Seed Hospital Capacity
INSERT INTO hospital_capacity (hospital_id, total_beds, available_beds, icu_beds, available_icu_beds, specialists_available)
SELECT id, 1200, 450, 50, 12, '["Oncology", "Cardiology", "Neurology"]'::jsonb FROM hospitals WHERE name = 'Kenyatta National Hospital'
ON CONFLICT (hospital_id) DO NOTHING;

INSERT INTO hospital_capacity (hospital_id, total_beds, available_beds, icu_beds, available_icu_beds, specialists_available)
SELECT id, 800, 210, 30, 5, '["Pediatrics", "Internal Medicine"]'::jsonb FROM hospitals WHERE name = 'Moi Teaching & Referral Hospital'
ON CONFLICT (hospital_id) DO NOTHING;

-- Seed Drug Inventory
INSERT INTO drug_inventory (hospital_id, drug_name, quantity, min_threshold)
SELECT id, 'Paracetamol 500mg', 120, 100 FROM hospitals WHERE name = 'Kenyatta National Hospital'
UNION ALL
SELECT id, 'Amoxicillin 250mg', 350, 150 FROM hospitals WHERE name = 'Moi Teaching & Referral Hospital'
UNION ALL
SELECT id, 'Artemether/Lumefantrine', 580, 200 FROM hospitals WHERE name = 'Coast General Hospital'
ON CONFLICT DO NOTHING;

-- Seed CHW Reports
INSERT INTO chw_reports (chw_id, patient_id, visit_type, symptoms, vitals)
SELECT 
    (SELECT id FROM users WHERE full_name = 'Jane CHW' LIMIT 1), -- Assuming you create this user
    (SELECT id FROM patients WHERE name = 'John Kamau' LIMIT 1),
    'Follow-up', 'Mild headache, improving', '{"bp": "130/85", "temp": 36.8}'::jsonb
ON CONFLICT DO NOTHING;
