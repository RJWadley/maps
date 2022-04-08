//service worker

//intercept fetch
self.addEventListener("fetch", function (event) {
  //check if the request is for a tile
  if (event.request.url.includes("tileserver")) {
    // event.respondWith(new Response("Hello from Service Worker!"));
    handleRequest(event);
  }
});

centerCoordinates = (xFromUrl, yFromUrl, zoom) => {
  width = 2 ** zoom;
  newX = xFromUrl - width / 2;
  newY = yFromUrl - width / 2;

  return [newX, newY];
};

getTileUrl = (coords) => {
  let Zcoord = 2 ** (8 - coords.z);
  let Xcoord = coords.x * 1;
  let Ycoord = coords.y * -1;

  let group = {
    x: Math.floor((Xcoord * Zcoord) / 32),
    y: Math.floor((Ycoord * Zcoord) / 32),
  };

  let numberInGroup = {
    x: Math.floor(Xcoord * Zcoord),
    y: Math.floor(Ycoord * Zcoord),
  };

  let zzz = "";

  for (var i = 8; i > coords.z; i--) {
    zzz += "z";
  }

  if (zzz.length != 0) zzz += "_";

  let url = `https://dynmap.minecartrapidtransit.net/tiles/new/flat/${group.x}_${group.y}/${zzz}${numberInGroup.x}_${numberInGroup.y}.png`;
  return url;
};

// Respond to the request with a new image
handleRequest = async (event) => {
  let request = event.request;
  //get the coordinates from the pathname
  let url = new URL(request.url);
  let coords = url.pathname.split("/").slice(1);
  let z = Math.abs(14 - coords[0]);
  let x = parseInt(coords[1]);
  let y = parseInt(coords[2]);

  //shift the image to match mapboxes expected coordinates
  let invertedZ = Math.abs(z - 8);
  let shiftFactor = 2 ** z;
  y += shiftFactor;

  let newCoords = centerCoordinates(x, y, coords[0]);

  //convert to imageurl
  let imageUrl = getTileUrl({ x: newCoords[0], y: newCoords[1], z: z });

  //respond to the event with the image
  event.respondWith(
    fetch(imageUrl).then((response) => {
      return response;
    })
  );
};
