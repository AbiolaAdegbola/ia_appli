const Card = () => {
    const data = [
        [{"nom": "ADEGBOLA", "id": "65c3a7404395c067230e9377", "taux": 0.37}],
        [{"nom": "ADEGBOLA", "id": "65c3a7404395c067230e9377", "taux": 0.77}],
        [{"nom": "ADEGBOLA", "id": "65c3a7404395c067230e9377", "taux": 0.47}],
        [{"nom": "inconnu", "id": "", "taux": 0.67}],
        [{"nom": "ADEGBOLA", "id": "65c3a7404395c067230e9377", "taux": 0.37}, {"nom": "inconnu", "id": "", "taux": 0.67}]
    ];
    
// Regrouper les éléments par ID
const groupedData = data.reduce((acc, curr) => {
    const id = curr[0].id;
    if (!acc[id]) {
        acc[id] = [];
    }
    acc[id].push(curr[0]);
    return acc;
}, {});

// Filtrer les éléments avec le même ID et conserver l'élément avec le taux le plus élevé
const filteredData = Object.values(groupedData).map(group => {
    const maxTauxElement = group.reduce((maxElement, currentElement) => {
        return currentElement.taux > maxElement.taux ? currentElement : maxElement;
    }, { taux: -Infinity });
    return maxTauxElement;
});

console.log("Résultat filtré :", filteredData);
    return (
        <div>
            <div class="content-main">
                <div class="card-grid">
                    <article class="card">
                        <div class="card-header">
                            <div>
                                <span><img src="https://assets.codepen.io/285131/zeplin.svg" /></span>
                                <h3>Zeplin</h3>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" />
                                <span></span>
                            </label>
                        </div>
                        <div class="card-body">
                            <p>Collaboration between designers and developers.</p>
                        </div>
                        <div class="card-footer">
                            <a href="#">View integration</a>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}

export default Card;
