console.log("Hello, world");

let url = "https://localhost:44314/api/point";

let request = new XMLHttpRequest();

request.onreadystatechange = () => {
  if (request.readyState === 4) {
    console.log(request.responseText);
  }
};

request.open("get", url);
request.send();
