


fetch("https://2207-resources.s3.ap-southeast-1.amazonaws.com/senticnet_sg.csv")
    .then((response) => response.json())
    .then((json) => console.log(json));

