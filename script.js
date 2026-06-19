// =========================
// MY LIBRARY
// CHUNK 1
// =========================

// ---------- DATA ----------

let library =
JSON.parse(
localStorage.getItem("library")
) || [];

library.forEach(x=>{

    if(!x.activities)
    x.activities=[];

});

let currentIndex = -1;

// ---------- SAVE ----------

function saveLibrary(){

    localStorage.setItem(
        "library",
        JSON.stringify(library)
    );

    renderLibrary();

}

// ---------- MODALS ----------

function showModal(id){

    document
    .getElementById(id)
    .style.display="flex";

}

function hideModal(id){

    document
    .getElementById(id)
    .style.display="none";

}

// ---------- RENDER ----------

function renderLibrary(){

    let container=
    document.getElementById(
    "library"
    );

    container.innerHTML="";

    let search=
    document.getElementById(
    "search"
    )
    .value
    .toLowerCase();

    let sort=
    document.getElementById(
    "sort"
    )
    .value;

    let temp=[...library];

    if(sort=="name"){

        temp.sort(
        (a,b)=>
        a.name.localeCompare(
        b.name
        )
        );

    }

    if(sort=="score"){

        temp.sort(
        (a,b)=>
        b.score-a.score
        );

    }

    temp.forEach(item=>{

        if(
        !item.name
        .toLowerCase()
        .includes(search)
        )
        return;

        let original=
        library.indexOf(item);

        let card=
        document.createElement(
        "div"
        );

        card.className=
        "card";

        let html="";

        html+=`
        <div class="cardTitle">

        <span>
        📁 ${item.name}
        </span>

        <span class="score">
        ${item.score}
        </span>

        </div>
        `;

        if(
        item.activities.length>0
        ){

            item.activities
            .forEach(a=>{

            let icon="📌";

            if(
            a.type=="Anime"
            )
            icon="📺";

            if(
            a.type=="Manga"
            )
            icon="📖";

            if(
            a.type=="Manhwa"
            )
            icon="📖";

            if(
            a.type=="Novel"
            )
            icon="📚";

            if(
            a.type=="Movie"
            )
            icon="🎬";

            if(
            a.type=="Game"
            )
            icon="🎮";

            html+=`
            <div class="activity">

            ${icon}

            ${a.status}

            ${a.type}

            </div>
            `;

            });

        }

        card.innerHTML=
        html;

        card.onclick=
        function(){

        openFranchise(
        original
        );

        };

        container
        .appendChild(card);

    });

}

// ---------- ADD FRANCHISE ----------

document
.getElementById(
"addButton"
)
.onclick=function(){

showModal(
"franchiseModal"
);

};

document
.getElementById(
"cancelFranchise"
)
.onclick=function(){

hideModal(
"franchiseModal"
);

};

document
.getElementById(
"saveFranchise"
)
.onclick=function(){

let name=
document
.getElementById(
"franchiseName"
)
.value
.trim();

let score=
document
.getElementById(
"franchiseScore"
)
.value;

if(
name==""
){

alert(
"Enter a name."
);

return;

}

let found=
library.find(
x=>
x.name.toLowerCase()
==
name.toLowerCase()
);

if(found){

alert(
"Franchise already exists."
);

return;

}

if(
score==""
)
score=0;

library.push({

name:name,

score:Number(
score
),

activities:[]

});

document
.getElementById(
"franchiseName"
).value="";

document
.getElementById(
"franchiseScore"
).value="";

hideModal(
"franchiseModal"
);

saveLibrary();

};

// ---------- SEARCH ----------

document
.getElementById(
"search"
)
.oninput=
renderLibrary;

// ---------- SORT ----------

document
.getElementById(
"sort"
)
.onchange=
renderLibrary;


// ---------- OPEN ----------

function openFranchise(i){

    currentIndex=i;

    document
    .getElementById(
    "detailsPage"
    )
    .style.display="block";

    document
    .getElementById(
    "detailsTitle"
    )
    .innerHTML=
    library[i].name;

    document
    .getElementById(
    "detailsScore"
    )
    .innerHTML=
    library[i].score;

    renderActivities();

}

// ---------- BACK ----------

document
.getElementById(
"backButton"
)
.onclick=function(){

document
.getElementById(
"detailsPage"
)
.style.display="none";

};

// ---------- RENDER ACTIVITIES ----------

function renderActivities(){

let div=
document
.getElementById(
"activityList"
);

div.innerHTML="";

let list=
library[
currentIndex
].activities;

if(
list.length==0
){

div.innerHTML=
"<p>No activities yet.</p>";

return;

}

list.forEach((a,i)=>{

let icon="📌";

switch(a.type){

case "Anime":
icon="📺";
break;

case "Manga":
icon="📖";
break;

case "Manhwa":
icon="📖";
break;

case "Novel":
icon="📚";
break;

case "Movie":
icon="🎬";
break;

case "Game":
icon="🎮";
break;

}

let card=
document
.createElement(
"div"
);

card.className=
"activityCard";

card.innerHTML=

`
<h4>

${icon}
${a.type}

</h4>

${a.status}

<br>

${a.progress}

<br><br>

<button
onclick="deleteActivity(${i})"
>

Delete

</button>

`;

div.appendChild(card);

});

}

// ---------- ADD ACTIVITY ----------

document
.getElementById(
"addActivity"
)
.onclick=function(){

showModal(
"activityModal"
);

};

document
.getElementById(
"cancelActivity"
)
.onclick=function(){

hideModal(
"activityModal"
);

};

document
.getElementById(
"saveActivity"
)
.onclick=function(){

library[
currentIndex
]
.activities.push({

type:
document
.getElementById(
"activityType"
).value,

status:
document
.getElementById(
"activityStatus"
).value,

progress:
document
.getElementById(
"activityProgress"
).value

});

document
.getElementById(
"activityProgress"
).value="";

hideModal(
"activityModal"
);

saveLibrary();

renderActivities();

};

// ---------- DELETE ACTIVITY ----------

function deleteActivity(i){

if(
confirm(
"Delete activity?"
)
){

library[
currentIndex
]
.activities.splice(
i,
1
);

saveLibrary();

renderActivities();

}

}