const classList = document.getElementById('classList');
const searchBar=document.getElementById('searchBar')
let csClasses = [];
console.log(searchBar);
searchBar.addEventListener('keyup', (e) => {
    const searchString= e.target.value.toLowerCase();
    const filteredClasses = csClasses.filter((course) => {
        return course.name.toLowerCase().includes(searchString);
    });
    displayClasses(filteredClasses);
});
const loadClasses = async () => {
    try {
        
        const res = await fetch('https://hp-api.herokuapp.com/api/characters');
        /*const csClasses = await fetch('characters.json',{
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
          .then(function(response){
            console.log(response)
            return response.json();
          })
          .then(function(myJson) {
            console.log(myJson);
            setData(myJson)
          });*/
        csClasses = await res.json();
        displayClasses(csClasses);
    } catch (err) {
        console.error(err);
    }
};

const displayClasses = (classes) => {
    const htmlString = classes
        .map((course) => {
            return `
                <li class="course">
                        <h2>${course.name}</h2>
                 </li>
                `;
        })
        .join('');
    classList.innerHTML = htmlString;
};

loadClasses();