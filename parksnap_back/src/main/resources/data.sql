-- Add initial database records on first connect to database

-- User types
INSERT IGNORE INTO user_type (type_id, type_name) VALUES (0, 'USER');
INSERT IGNORE INTO user_type (type_id, type_name) VALUES (1, 'ADMIN');

-- Vehicle types
INSERT IGNORE INTO vehicle_type (type_id, type_name) VALUES (0, 'Car');
INSERT IGNORE INTO vehicle_type (type_id, type_name) VALUES (1, 'Bike');
INSERT IGNORE INTO vehicle_type (type_id, type_name) VALUES (2, 'Foot Cycle');
INSERT IGNORE INTO vehicle_type (type_id, type_name) VALUES (3, 'Bus');

-- Slot types
INSERT IGNORE INTO slot_type (type_id, type_name) VALUES (1, 'Bike');
INSERT IGNORE INTO slot_type (type_id, type_name) VALUES (2, 'Car');

-- Lots
INSERT IGNORE INTO lot (lot_id, location, no_of_slots) VALUES (0, 'Front Gate', 17);
INSERT IGNORE INTO lot (lot_id, location, no_of_slots) VALUES (0, 'Back Gate', 17);

-- Slots
-- Slots of lot 0
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (1, 1, 1);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (2, 1, 1);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (3, 1, 1);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (4, 1, 1);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (5, 1, 1);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (6, 1, 1);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (7, 1, 1);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (8, 1, 1);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (9, 1, 1);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (10, 2, 1);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (11, 2, 1);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (12, 2, 1);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (13, 2, 1);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (14, 2, 1);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (15, 2, 1);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (16, 2, 1);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (17, 2, 1);
-- Slots of lot 1
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (21, 1, 2);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (22, 1, 2);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (23, 1, 2);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (24, 1, 2);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (25, 1, 2);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (26, 1, 2);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (27, 1, 2);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (28, 1, 2);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (29, 1, 2);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (30, 2, 2);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (31, 2, 2);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (32, 2, 2);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (33, 2, 2);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (34, 2, 2);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (35, 2, 2);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (36, 2, 2);
INSERT IGNORE INTO slot (slot_id, type_id, lot_id) VALUES (37, 2, 2);

-- Test users
INSERT IGNORE INTO user (user_id, name, password, phone_no, username, type_id) VALUES (200, "Adam", "$2a$10$/RsgxnXkZOyb4cEmizldCeJ.D3roGcYJJm5QWj1RPYcAFfpCRCRSm", "0716945673","adam",1);
INSERT IGNORE INTO vehicle (vehicle_id, license_plate, user_id, type_id) VALUES (200, "ABC-6274", 200, 0);
INSERT IGNORE INTO vehicle (vehicle_id, license_plate, user_id, type_id) VALUES (201, "AZ-6274", 200, 1);
