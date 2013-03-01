drop table if exists CoreLocation;
create table CoreLocation (
  id integer primary key autoincrement,
  latitude DECIMAL(18,6),
  longitude DECIMAL(18,6),
  altitude DECIMAL(18,6),
  horizontalAccuracy DECIMAL(18,6),
  verticalAccuracy DECIMAL(18,6),
  speed DECIMAL(18,6),
  calculatedSpeed DECIMAL(18,6),
  direction DECIMAL(18,6),
  time datetime
);
