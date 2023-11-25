// 1- fetch data
const loadData = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const info = await res.json();
    const data = info.data.tools;
    // console.log(data);
    displayData(data)
}

const displayData = (data) => {


    // 2- get the display container
    const displayContainer = document.getElementById('display-container');

    data.forEach(ai => {
        console.log(ai);


        // 3- create element
        const dataContainer = document.createElement('div');
        dataContainer.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure class="px-8 pt-10">
                <img src="${ai?.image || 'No Image found'}" alt="" class="rounded-xl" />
            </figure>
            <div class="card-body items-left text-left">
                <h2 class="text-xl font-bold">Features</h2>
                <ol class='text-left pl-4' style="list-style: decimal;">
                    <li>${ai?.features?.[0]}</li>
                    <li>${ai?.features?.[1]}</li>
                    <li>${ai?.features?.[2]}</li>
                </ol>
                <hr class="my-4">
                <div class="flex justify-between">
                    <div>
                        <h2 class="text-xl font-bold">${ai?.name}</h2>
                        <p> <i class="fa-solid fa-calendar-days"></i> ${ai?.published_in} </p>
                    </div>
                    <div class="card-actions">
                        <a href="">
                            <i class="fa-solid fa-circle-arrow-right text-5xl text-sky-500"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `
        displayContainer.appendChild(dataContainer);

    });
}

loadData();