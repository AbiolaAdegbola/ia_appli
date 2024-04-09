
const Card = () => {
//     const data = [
//         [{"nom": "ADEGBOLA", "id": "65c3a7404395c067230e9377", "taux": 0.37}],
//         [{"nom": "ADEGBOLA", "id": "65c3a7404395c067230e9377", "taux": 0.77}],
//         [{"nom": "ADEGBOLA", "id": "65c3a7404395c067230e9377", "taux": 0.47}],
//         [{"nom": "inconnu", "id": "", "taux": 0.67}],
//         [{"nom": "ADEGBOLA", "id": "65c3a7404395c067230e9377", "taux": 0.37}, {"nom": "inconnu", "id": "", "taux": 0.67}]
//     ];
    
// // Regrouper les éléments par ID
// const groupedData = data.reduce((acc, curr) => {
//     const id = curr[0].id;
//     if (!acc[id]) {
//         acc[id] = [];
//     }
//     acc[id].push(curr[0]);
//     return acc;
// }, {});

// // Filtrer les éléments avec le même ID et conserver l'élément avec le taux le plus élevé
// const filteredData = Object.values(groupedData).map(group => {
//     const maxTauxElement = group.reduce((maxElement, currentElement) => {
//         return currentElement.taux > maxElement.taux ? currentElement : maxElement;
//     }, { taux: -Infinity });
//     return maxTauxElement;
// });

// console.log("Résultat filtré :", filteredData);

    return (
        <div>
            <div class="content-main">
                <div class="card-grid">
                    <article class="card">                      
                        <div class="card-footer">
                        <a href="https://earth.google.com/web/search/Universit%c3%a9+F%c3%a9lix+Houphouet+Boigny,+Abidjan/@5.3503675,-3.981999,36.44358954a,2353.88095343d,35y,0h,0t,0r/data=CigiJgokCUpFP0i4ahVAEbxKJArVYhVAGfN9ZSPQyg_AIWM9Ljl06w_AOgMKATA" target="_bank">Vue Google Earth</a>
                        </div>
                    </article>

                    <article class="card">                      
                        <div class="card-footer">
                        <a href="https://www.google.com/maps/place/Universit%C3%A9+F%C3%A9lix-Houphou%C3%ABt-Boigny/@5.3427317,-3.9865893,69m/data=!3m1!1e3!4m7!3m6!1s0xfc1ec81f79543ef:0x1d950e333a37402c!4b1!8m2!3d5.3456163!4d-3.9862555!16s%2Fm%2F05p4k2b?entry=ttu" target="_bank">Vue Google Maps</a>
                        </div>
                    </article>
                </div>

            </div>
        </div>
    );
}

export default Card;
