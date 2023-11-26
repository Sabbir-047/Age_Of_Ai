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
                <ol id="" class='text-left pl-4' style="list-style: decimal;">
                    <li>${ai?.features?.[0] || 'Not Available'}</li>
                    <li>${ai?.features?.[1] || 'Not Available'}</li>
                    <li>${ai?.features?.[2] || 'Not Available'}</li>
                </ol>
                <hr class="my-4">
                <div class="flex justify-between">
                    <div>
                        <h2 class="text-xl font-bold">${ai?.name}</h2>
                        <p> <i class="fa-solid fa-calendar-days"></i> ${ai?.published_in} </p>
                    </div>
                    <div class="card-actions">
                        <button onclick="aiDetailsHandler('${ai.id}')" class="btn btn-circle">
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


// --------       We can do the main feature by for-of loop method ------




// 5- show details handler - get data from server and show modal
const aiDetailsHandler = async (id) => {
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const details = data.data;
    // console.log(details);
    showAiDetails(details);
    features2Container(details);
    integrationContainer(details);

    // show modal
    show_ai_details.showModal();
}


// 6- show details
const showAiDetails = (details) => {
    // console.log(details);

    // get the tool details container
    const toolDetailsContainer = document.getElementById('tool-details-container');
    // create div
    toolDetailsContainer.classList.add('text-white');
    toolDetailsContainer.innerHTML = `
        <h3 class="text-2xl"> ${details.description} </h3>
        <div class="grid grid-cols-3 gap-4 text-center">
            <div class="bg-gray-100 p-3 rounded-xl font-bold text-green-600">
                <p> ${details.pricing[0].price} </p>
                <p> ${details.pricing[0].plan} </p>
            </div> 
            <div class="bg-gray-100 p-3 rounded-xl font-bold text-orange-600">
                <p> ${details.pricing[1].price} </p>
                <p> ${details.pricing[1].plan} </p>
            </div> 
            <div class="bg-gray-100 p-3 rounded-xl font-bold text-red-600">
                <p> ${details.pricing[2].price} </p>
                <p> ${details.pricing[2].plan} </p>
            </div> 
        </div>
        <div class="flex justify-around">
            <div>
                <h3 class="text-2xl mb-4">Features</h3>
                <ol id="features2" class="ml-5 space-y-2" style="list-style: circle">
                    
                </ol>
            </div>
            <div>
                <h3 class="text-2xl mb-4">Integrations</h3>
                <ol id="integration-container" class=" space-y-2" style="list-style: circle;"></ol>
            </div>
        </div>
        `
}


// 7- feature inside modal part
/**
    1 - feature inside modal if we have more than fixed data. then we should follow this method
    2 - but in this project we have fixed method we can use fixed thing
    3 - integration info is also same
 *  
 */
const features2Container = (details) => {

    const features2 = details.features;

    const features2Container = document.getElementById('features2');
    for (const key in features2) {
        const feature = features2[key];
        const featureData = document.createElement('li');
        featureData.innerHTML = `
            <li> ${feature.feature_name} </li> 
        `
        features2Container.appendChild(featureData);
    }
}



// 8 - Integrations inside modal part by looping
const integrationContainer = (details) => { 
    console.log(details);
    const integrationContainer = document.getElementById('integration-container');
    const integrationList = details.integrations;
    for (const integrationData of integrationList) {
        const integrations = document.createElement('li');
        integrations.innerHTML = `
            ${integrationData || 'No Data Available'};
        `
        integrationContainer.appendChild(integrations);
    }
}




// 4- see more button
const seeMoreHandler = () => {
    loadData(true);
}

loadData();