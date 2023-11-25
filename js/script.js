// 1- fetch data
const loadData = async (isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const info = await res.json();
    const data = info.data.tools;
    // console.log(data);
    displayData(data, isShowAll)
}

const displayData = (data, isShowAll) => {


    // 2- get the display container
    const displayContainer = document.getElementById('display-container');

    // 4.1- show all button (working)
    const showAllButtonContainer = document.getElementById('see-more-container')
    if (data.length > 6 && !isShowAll) {
        showAllButtonContainer.classList.remove('hidden');
    } else {
        showAllButtonContainer.classList.add('hidden');
    }


    // limit data if exceeds over 6
    if (!isShowAll) {
        data = data.slice(0, 6);
    }


    data.forEach(ai => {
        // console.log(ai);

        // 3- create element
        const dataContainer = document.createElement('div');
        dataContainer.innerHTML = `
        <div class="card bg-base-100 shadow-lg shadow-cyan-100/50 hover:shadow-blue-300/50 hover:shadow-xl">
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
                        <button class="btn btn-circle">
                            <i class="fa-solid fa-circle-arrow-right text-5xl text-sky-500"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `
        displayContainer.appendChild(dataContainer);

    });
}


// 4- see more button
const seeMoreHandler = () => {
    loadData(true);
}

loadData();