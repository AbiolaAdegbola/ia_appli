import React from 'react';

const Card = () => {
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
                                <input type="checkbox" checked />
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
