const loadData = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const info = await res.json();
    const data = info.data.tools;
    // console.log(data);
    displayData(data)
}

const displayData = (data) => {


    data.forEach(ai => {
        console.log(ai);

        
    });
}

loadData();