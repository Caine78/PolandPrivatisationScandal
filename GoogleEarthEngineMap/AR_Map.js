ui.root.setLayout(ui.Panel.Layout.absolute());
// Load an image
var w1939 = image2;
var w1945 = image32;

var buildings = wb2019;
var visParams = {
  palette: ['ff0000', 'b5ffb4', 'beeaff', 'ffc0e8', '8e8dff', 'adadad'],
  min: 0.0,
  max: 894.0,
  opacity: 1,
};

// Load a Fusion Table from the ID using the FeatureCollection constructor.
// Load a FeatureCollection from a table dataset: 'RESOLVE' ecoregions.

// Add a color-SWIR composite to the default Map.
Map.addLayer(w1939.clip(w1939mask), {}, '1939r', false);

Map.addLayer(w1945.clip(w1939mask), {}, '1945r');

Map.addLayer(w1948.clip(w1948mask), {}, '1948r Inwentaryzacja', false);
var wb2019 = ee.Image().float().paint(buildings, 'iso_num');
Map.addLayer(wb2019, visParams, '2019r Budynki');

// Make another map and add a color composite to it.
var linkedMap = ui.Map({style: {position: "top-left"}});
linkedMap.addLayer(w1939.clip(w1939mask), {}, '1939r');
linkedMap.addLayer(w1945.clip(w1939mask), {}, '1945r');
linkedMap.addLayer(w1948.clip(w1948mask), {}, '1948r Inwentaryzacja');
var wb2019 = ee.Image().float().paint(buildings, 'iso_num');
linkedMap.addLayer(wb2019, visParams, '2019r Budynki');

// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);

// Make an inset map and add it to the linked map.
var inset = ui.Map({style: {position: "bottom-right"}});
linkedMap.add(inset);

// Register a function to the linked map to update the inset map.
linkedMap.onChangeBounds(function() {
  var bounds = ee.Geometry.Rectangle(Map.getBounds());
  inset.centerObject(bounds);
  //inset.layers().set(0, bounds);
});

// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});

// Get the timestamp and convert it to a date.
//var date = ee.Date(image.get('system:time_start'));
//print('Timestamp: ', date); // ee.Date

// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);

linkedMap.setCenter(21.012229, 52.229676, 13);
//Map.style().set('cursor', 'crosshair');