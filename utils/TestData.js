export const testDataQuery = `INSERT INTO User (
  userId,
  email,
  name,
  password,
  age,
  gender,
  target,
  targetWeight,
  bedTime,
  wakeUpTime,
  waterReminderInterval,
  isActiveWaterNotification,
  minExerPerDay,
  dayExerPerWeek
) VALUES (
  'u123',                     -- userId
  'johndoe@example.com',     -- email
  'John Doe',                -- name
  'hashed_password_123',     -- password
  17,                        -- age
  'male',                    -- gender
  'maintain_weight',         -- target
  '70',                      -- targetWeight
  '22:30',                   -- bedTime
  '06:30',                   -- wakeUpTime
  90,                       -- waterReminderInterval (minutes)
  1,                         -- isActiveWaterNotification (1 = true, 0 = false)
  30,                        -- minExerPerDay (minutes)
  5                          -- dayExerPerWeek
);


INSERT INTO DailyNutrition (
  dailyNutritionId,
  userId,
  weight,
  height,
  bmi,
  targetCalories,
  targetCarbs,
  targetFat,
  targetProtein,
  dateDailyNutrition
) VALUES 
  ('dn001', 'u123', 67.8, 172, 22.8, 2200, 265, 63, 108, '2025-04-27'),
  ('dn002', 'u123', 68.0, 172, 22.9, 2200, 270, 65, 105, '2025-04-28'),
  ('dn003', 'u123', 68.2, 172, 23.0, 2200, 275, 68, 102, '2025-04-29'),
  ('dn004', 'u123', 68.5, 172, 23.1, 2200, 280, 70, 100, '2025-04-30'),
  ('dn005', 'u123', 67.8, 172, 22.8, 2200, 265, 63, 108, '2025-05-01'),
  ('dn006', 'u123', 68.0, 172, 22.9, 2200, 270, 65, 105, '2025-05-02'),
  ('dn007', 'u123', 68.2, 172, 23.0, 2200, 275, 68, 102, '2025-05-03'),
  ('dn008', 'u123', 68.5, 172, 23.1, 2200, 280, 70, 100, '2025-05-04'),
  ('dn009', 'u123', 67.8, 172, 22.8, 2200, 265, 63, 108, '2025-05-05'),
  ('dn010', 'u123', 68.0, 172, 22.9, 2200, 270, 65, 105, '2025-05-06'),
  ('dn011', 'u123', 68.2, 172, 23.0, 2200, 275, 68, 102, '2025-05-07'),
  ('dn012', 'u123', 68.5, 172, 23.1, 2200, 280, 70, 100, '2025-05-08'),
  ('dn013', 'u123', 67.8, 172, 22.8, 2200, 265, 63, 108, '2025-05-09'),
  ('dn014', 'u123', 68.0, 172, 22.9, 2200, 270, 65, 105, '2025-05-10'),
  ('dn015', 'u123', 68.2, 172, 23.0, 2200, 275, 68, 102, '2025-05-11'),
  ('dn016', 'u123', 68.5, 172, 23.1, 2200, 280, 70, 100, '2025-05-12');


-- Insert Vietnamese ingredients data into Food table
INSERT INTO Food (foodId, nameFood, barcode, calories, carbs, fat, protein, averageNutritional, measurement, servingSize, unit, isFavorite, isCreatedByUser)
VALUES
-- Common ingredients nationwide
('VI001', 'rice', NULL, 130, 28, 0.3, 2.7, 100, 'Cup', 100, 'g', 0, 0),
('VI002', 'sticky rice', NULL, 97, 21, 0.2, 2, 100, 'Cup', 100, 'g', 0, 0),
('VI003', 'rice noodles', NULL, 131, 30, 0.2, 2.5, 100, 'Cup', 100, 'g', 1, 1),
('VI004', 'egg noodles', NULL, 138, 25, 2, 5, 100, 'Cup', 100, 'g', 0, 0),
('VI005', 'vermicelli', NULL, 131, 31, 0.1, 1.5, 100, 'Cup', 100, 'g', 0, 0),
('VI006', 'bread', NULL, 265, 50, 3.5, 9, 100, 'Slice', 50, 'g', 0, 0),
('VI007', 'pork', NULL, 242, 0, 19, 17, 100, 'Piece', 100, 'g', 0, 0),
('VI008', 'beef', NULL, 250, 0, 18, 19, 100, 'Piece', 100, 'g', 0, 0),
('VI009', 'chicken', NULL, 165, 0, 3.6, 31, 100, 'Piece', 100, 'g', 0, 0),
('VI010', 'duck', NULL, 337, 0, 28, 19, 100, 'Piece', 100, 'g', 0, 0),
('VI011', 'fish', NULL, 206, 0, 12, 22, 100, 'Piece', 100, 'g', 0, 0),
('VI012', 'shrimp', NULL, 99, 0.2, 0.3, 24, 100, 'Handful', 100, 'g', 0, 0),
('VI013', 'crab', NULL, 83, 0, 0.7, 18, 100, 'Piece', 100, 'g', 0, 0),
('VI014', 'squid', NULL, 92, 3, 1.4, 16, 100, 'Piece', 100, 'g', 0, 0),
('VI015', 'egg', NULL, 68, 0.5, 5, 6, 100, 'Piece', 50, 'g', 1, 1),
('VI016', 'tofu', NULL, 76, 1.9, 4.8, 8, 100, 'Piece', 100, 'g', 1, 1),
('VI017', 'fish sauce', NULL, 10, 0.9, 0, 2, 100, 'Tablespoon', 15, 'ml', 0, 0),
('VI018', 'soy sauce', NULL, 8, 0.8, 0.1, 1.3, 100, 'Tablespoon', 15, 'ml', 0, 0),
('VI019', 'salt', NULL, 0, 0, 0, 0, 100, 'Teaspoon', 5, 'g', 0, 0),
('VI020', 'sugar', NULL, 16, 4, 0, 0, 100, 'Teaspoon', 4, 'g', 0, 0),
('VI021', 'pepper', NULL, 3, 0.6, 0.1, 0.1, 100, 'Teaspoon', 2, 'g', 0, 0),
('VI022', 'chili', NULL, 40, 9, 0.4, 1.9, 100, 'Piece', 45, 'g', 0, 0),
('VI023', 'garlic', NULL, 149, 33, 0.5, 6, 100, 'Piece', 10, 'g', 0, 0),
('VI024', 'shallot', NULL, 72, 17, 0.1, 2.5, 100, 'Piece', 20, 'g', 0, 0),
('VI025', 'onion', NULL, 40, 9, 0.1, 1.1, 100, 'Piece', 100, 'g', 0, 0),
('VI026', 'ginger', NULL, 80, 18, 0.8, 1.8, 100, 'Piece', 20, 'g', 0, 0),
('VI027', 'lemongrass', NULL, 99, 25, 0.5, 1.8, 100, 'Piece', 20, 'g', 0, 0),
('VI028', 'turmeric', NULL, 112, 23, 1, 3, 100, 'Teaspoon', 5, 'g', 0, 0),
('VI029', 'cooking oil', NULL, 120, 0, 14, 0, 100, 'Tablespoon', 15, 'ml', 0, 0),
('VI030', 'coconut milk', NULL, 140, 3, 14, 1.5, 100, 'Cup', 100, 'ml', 0, 0),
('VI031', 'lime', NULL, 20, 7, 0.1, 0.5, 100, 'Piece', 50, 'g', 0, 0),
('VI032', 'water', NULL, 0, 0, 0, 0, 100, 'Cup', 240, 'ml', 0, 0),

-- Northern ingredients
('VI033', 'dill', NULL, 43, 7, 1.1, 3.5, 100, 'Handful', 20, 'g', 0, 0),
('VI034', 'perilla', NULL, 37, 7, 0.4, 3, 100, 'Handful', 20, 'g', 0, 0),
('VI035', 'green onion', NULL, 32, 7, 0.2, 1.8, 100, 'Handful', 20, 'g', 0, 0),
('VI036', 'fermented pork', NULL, 200, 5, 15, 12, 100, 'Piece', 50, 'g', 0, 0),
('VI037', 'sour plum', NULL, 46, 11, 0.2, 0.7, 100, 'Piece', 30, 'g', 0, 0),
('VI038', 'bamboo shoot', NULL, 27, 5, 0.3, 2.6, 100, 'Piece', 100, 'g', 0, 0),
('VI039', 'wood ear mushroom', NULL, 25, 6, 0.1, 0.5, 100, 'Handful', 20, 'g', 0, 0),
('VI040', 'shiitake mushroom', NULL, 34, 7, 0.5, 2.2, 100, 'Piece', 20, 'g', 0, 0),
('VI041', 'lotus seed', NULL, 89, 17, 0.5, 4, 100, 'Handful', 30, 'g', 0, 0),
('VI042', 'longan', NULL, 60, 15, 0.1, 1.3, 100, 'Handful', 50, 'g', 0, 0),
('VI043', 'cinnamon', NULL, 6, 2, 0.1, 0.1, 100, 'Teaspoon', 2, 'g', 0, 0),
('VI044', 'star anise', NULL, 7, 1.5, 0.3, 0.2, 100, 'Piece', 2, 'g', 0, 0),
('VI045', 'clove', NULL, 6, 1.5, 0.3, 0.1, 100, 'Teaspoon', 2, 'g', 0, 0),
('VI046', 'bean sprouts', NULL, 31, 6, 0.2, 3, 100, 'Handful', 50, 'g', 0, 0),
('VI047', 'mustard greens', NULL, 27, 5, 0.4, 2.9, 100, 'Handful', 50, 'g', 0, 0);



INSERT INTO Workout (workoutId, userId, exerciseName, workoutDate, duration, calories, isCreatedByUser) VALUES
('W001', NULL, 'Jumping Jacks', NULL, 10, 100, 0),
('W002', NULL, 'Burpees', NULL, 10, 120, 0),
('W003', NULL, 'Mountain Climbers', NULL, 10, 110, 0),
('W004', NULL, 'Push-ups', NULL, 10, 70, 0),
('W005', NULL, 'Pull-ups', NULL, 10, 90, 0),
('W006', NULL, 'Squats', NULL, 10, 90, 0),
('W007', NULL, 'Jump Squats', NULL, 10, 120, 0),
('W008', NULL, 'Lunges', NULL, 10, 100, 0),
('W009', NULL, 'Plank', NULL, 10, 50, 0),
('W010', NULL, 'Side Plank', NULL, 10, 40, 0),
('W011', NULL, 'Crunches', NULL, 10, 60, 0),
('W012', NULL, 'Russian Twists', NULL, 10, 70, 0),
('W013', NULL, 'Leg Raises', NULL, 10, 60, 0),
('W014', NULL, 'Jump Rope', NULL, 10, 140, 0),
('W015', NULL, 'High Knees', NULL, 10, 120, 0),
('W016', NULL, 'Box Jumps', NULL, 10, 130, 0),
('W017', NULL, 'Bear Crawls', NULL, 10, 110, 0),
('W018', NULL, 'Cycling (moderate)', NULL, 10, 100, 0),
('W019', NULL, 'Cycling (intense)', NULL, 10, 160, 0),
('W020', NULL, 'Running (8km/h)', NULL, 10, 130, 0),
('W021', NULL, 'Running (10km/h)', NULL, 10, 150, 0),
('W022', NULL, 'Walking (5km/h)', NULL, 10, 50, 0),
('W023', NULL, 'Swimming (moderate)', NULL, 10, 150, 0),
('W024', NULL, 'Swimming (intense)', NULL, 10, 200, 0),
('W025', NULL, 'Rowing Machine', NULL, 10, 120, 0),
('W026', NULL, 'Elliptical Machine', NULL, 10, 100, 0),
('W027', NULL, 'Deadlifts', NULL, 10, 90, 0),
('W028', NULL, 'Bench Press', NULL, 10, 80, 0),
('W029', NULL, 'Dumbbell Shoulder Press', NULL, 10, 75, 0),
('W030', NULL, 'Bicep Curls', NULL, 10, 60, 0),
('W031', NULL, 'Triceps Dips', NULL, 10, 85, 0),
('W032', NULL, 'Leg Press', NULL, 10, 95, 0),
('W033', NULL, 'Kettlebell Swings', NULL, 10, 130, 0),
('W034', NULL, 'Wall Sits', NULL, 10, 80, 0),
('W035', NULL, 'Reverse Crunches', NULL, 10, 65, 0),
('W036', NULL, 'Decline Push-ups', NULL, 10, 85, 0),
('W037', NULL, 'Incline Push-ups', NULL, 10, 65, 0),
('W038', NULL, 'Diamond Push-ups', NULL, 10, 80, 0),
('W039', NULL, 'Supermans', NULL, 10, 45, 0),
('W040', NULL, 'Bird Dogs', NULL, 10, 40, 0);


INSERT INTO WaterIntake (waterIntakeId, userId, waterIntakeDate, waterPerCup, waterIntakeVolume)
VALUES 
('WI001', 'u123', '2025-04-27', 200, 3150),
('WI002', 'u123', '2025-04-28', 200, 3150),
('WI003', 'u123', '2025-04-29', 200, 3150),
('WI004', 'u123', '2025-04-30', 200, 3150),
('WI005', 'u123', '2025-05-01', 200, 3150),
('WI006', 'u123', '2025-05-02', 200, 3150),
('WI007', 'u123', '2025-05-03', 200, 3150),
('WI008', 'u123', '2025-05-04', 200, 3150),
('WI009', 'u123', '2025-05-05', 200, 3150),
('WI010', 'u123', '2025-05-06', 200, 3150),
('WI011', 'u123', '2025-05-07', 200, 3150),
('WI012', 'u123', '2025-05-08', 200, 3150),
('WI013', 'u123', '2025-05-09', 200, 3150),
('WI014', 'u123', '2025-05-10', 200, 3150),
('WI015', 'u123', '2025-05-11', 200, 3150),
('WI016', 'u123', '2025-05-12', 200, 3150);


-- Water Reminder Notification Insert Statements
INSERT INTO WaterReminderNotification (waterReminderNotificationId, userId, title, body, notificationTime)
VALUES 
('wrn001', 'u123', '💧 Drinking Water', 'Don''t forget to drink some water, buddy 🌿 06:40', '06:40'),
('wrn002', 'u123', '💧 Drinking Water', 'Don''t forget to drink some water, buddy 🌿 08:10', '08:10'),
('wrn003', 'u123', '💧 Drinking Water', 'Don''t forget to drink some water, buddy 🌿 09:40', '09:40'),
('wrn004', 'u123', '💧 Drinking Water', 'Don''t forget to drink some water, buddy 🌿 11:10', '11:10'),
('wrn005', 'u123', '💧 Drinking Water', 'Don''t forget to drink some water, buddy 🌿 12:40', '12:40'),
('wrn006', 'u123', '💧 Drinking Water', 'Don''t forget to drink some water, buddy 🌿 14:10', '14:10'),
('wrn007', 'u123', '💧 Drinking Water', 'Don''t forget to drink some water, buddy 🌿 15:40', '15:40'),
('wrn008', 'u123', '💧 Drinking Water', 'Don''t forget to drink some water, buddy 🌿 17:10', '17:10'),
('wrn009', 'u123', '💧 Drinking Water', 'Don''t forget to drink some water, buddy 🌿 18:40', '18:40'),
('wrn010', 'u123', '💧 Drinking Water', 'Don''t forget to drink some water, buddy 🌿 20:10', '20:10'),
('wrn011', 'u123', '💧 Drinking Water', 'Don''t forget to drink some water, buddy 🌿 21:40', '21:40');

INSERT INTO Meal (mealId, userId, nameMeal, dateMeal) VALUES
-- 2025-04-27
('m20250427B', 'u123', 'Breakfast', '2025-04-27'),
('m20250427L', 'u123', 'Lunch', '2025-04-27'),
('m20250427D', 'u123', 'Dinner', '2025-04-27'),
('m20250427S', 'u123', 'Snack', '2025-04-27'),

-- 2025-04-28
('m20250428B', 'u123', 'Breakfast', '2025-04-28'),
('m20250428L', 'u123', 'Lunch', '2025-04-28'),
('m20250428D', 'u123', 'Dinner', '2025-04-28'),
('m20250428S', 'u123', 'Snack', '2025-04-28'),

-- 2025-04-29
('m20250429B', 'u123', 'Breakfast', '2025-04-29'),
('m20250429L', 'u123', 'Lunch', '2025-04-29'),
('m20250429D', 'u123', 'Dinner', '2025-04-29'),
('m20250429S', 'u123', 'Snack', '2025-04-29'),

-- 2025-04-30
('m20250430B', 'u123', 'Breakfast', '2025-04-30'),
('m20250430L', 'u123', 'Lunch', '2025-04-30'),
('m20250430D', 'u123', 'Dinner', '2025-04-30'),
('m20250430S', 'u123', 'Snack', '2025-04-30'),

-- 2025-05-01
('m20250501B', 'u123', 'Breakfast', '2025-05-01'),
('m20250501L', 'u123', 'Lunch', '2025-05-01'),
('m20250501D', 'u123', 'Dinner', '2025-05-01'),
('m20250501S', 'u123', 'Snack', '2025-05-01'),

-- 2025-05-02
('m20250502B', 'u123', 'Breakfast', '2025-05-02'),
('m20250502L', 'u123', 'Lunch', '2025-05-02'),
('m20250502D', 'u123', 'Dinner', '2025-05-02'),
('m20250502S', 'u123', 'Snack', '2025-05-02'),

-- 2025-05-03
('m20250503B', 'u123', 'Breakfast', '2025-05-03'),
('m20250503L', 'u123', 'Lunch', '2025-05-03'),
('m20250503D', 'u123', 'Dinner', '2025-05-03'),
('m20250503S', 'u123', 'Snack', '2025-05-03'),

-- 2025-05-04
('m20250504B', 'u123', 'Breakfast', '2025-05-04'),
('m20250504L', 'u123', 'Lunch', '2025-05-04'),
('m20250504D', 'u123', 'Dinner', '2025-05-04'),
('m20250504S', 'u123', 'Snack', '2025-05-04'),

-- 2025-05-05
('m20250505B', 'u123', 'Breakfast', '2025-05-05'),
('m20250505L', 'u123', 'Lunch', '2025-05-05'),
('m20250505D', 'u123', 'Dinner', '2025-05-05'),
('m20250505S', 'u123', 'Snack', '2025-05-05'),

-- 2025-05-06
('m20250506B', 'u123', 'Breakfast', '2025-05-06'),
('m20250506L', 'u123', 'Lunch', '2025-05-06'),
('m20250506D', 'u123', 'Dinner', '2025-05-06'),
('m20250506S', 'u123', 'Snack', '2025-05-06'),

-- 2025-05-07
('m20250507B', 'u123', 'Breakfast', '2025-05-07'),
('m20250507L', 'u123', 'Lunch', '2025-05-07'),
('m20250507D', 'u123', 'Dinner', '2025-05-07'),
('m20250507S', 'u123', 'Snack', '2025-05-07'),

-- 2025-05-08
('m20250508B', 'u123', 'Breakfast', '2025-05-08'),
('m20250508L', 'u123', 'Lunch', '2025-05-08'),
('m20250508D', 'u123', 'Dinner', '2025-05-08'),
('m20250508S', 'u123', 'Snack', '2025-05-08'),

-- 2025-05-09
('m20250509B', 'u123', 'Breakfast', '2025-05-09'),
('m20250509L', 'u123', 'Lunch', '2025-05-09'),
('m20250509D', 'u123', 'Dinner', '2025-05-09'),
('m20250509S', 'u123', 'Snack', '2025-05-09'),

-- 2025-05-10
('m20250510B', 'u123', 'Breakfast', '2025-05-10'),
('m20250510L', 'u123', 'Lunch', '2025-05-10'),
('m20250510D', 'u123', 'Dinner', '2025-05-10'),
('m20250510S', 'u123', 'Snack', '2025-05-10'),

-- 2025-05-11
('m20250511B', 'u123', 'Breakfast', '2025-05-11'),
('m20250511L', 'u123', 'Lunch', '2025-05-11'),
('m20250511D', 'u123', 'Dinner', '2025-05-11'),
('m20250511S', 'u123', 'Snack', '2025-05-11'),

-- 2025-05-12
('m20250512B', 'u123', 'Breakfast', '2025-05-12'),
('m20250512L', 'u123', 'Lunch', '2025-05-12'),
('m20250512D', 'u123', 'Dinner', '2025-05-12'),
('m20250512S', 'u123', 'Snack', '2025-05-12');

`;
