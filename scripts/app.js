const form = document.getElementById('review-form');

function createCardTemplate(product) {
    const div = `<div class="card">
    <img src="${product.image}" alt="${product.name}" class="card__image" width="300px"
        height="300px">
    <div class="card__description">
        <p class="card__title">${product.name}:<br>${product.flovers}</p>
        <p class="card__price">${product.price}</p>
    </div>
    </div>`;

    return createFragmentTemplate(div);
}

function createReviewsTemplate(review) {
    const div = `<div class="reviews__item">
    <span class="reviews__name">${review.name}</span>
    <span class="reviews__text">“${review.body}”</span>
    </div>`;

    return createFragmentTemplate(div);
}

function createFragmentTemplate(str) {
    const template = document.createElement('template');

    template.innerHTML = str;

    return template.content;
}

function appendContent(id, content) {
    const el = document.getElementById(id);

    el.appendChild(content);
}

async function createReview(name, review) {

	const item = {
        id: 501,
        name: name,
        body: review
	};

	fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        body: JSON.stringify(item)
    })

}

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const name = event.currentTarget.querySelector('#inp-name').value;
    const review = event.currentTarget.querySelector('#txtarea-review').value;

	if(name && review) {
        event.currentTarget.querySelector('#inp-name').value = '';
        event.currentTarget.querySelector('#txtarea-review').value = '';
		createReview(name, review);
	}
})

function init() {
    fetch('https://run.mocky.io/v3/17ea0a2c-1361-4329-b997-a36e8b984b51')
        .then((res) => res.json())
        .then((data) => {
            const fragment = document.createDocumentFragment();

            data.forEach((product) => {
                fragment.appendChild(createCardTemplate(product));
            });

            appendContent('products', fragment);
        });

    fetch('https://jsonplaceholder.typicode.com/comments')
        .then((res) => res.json())
        .then((data) => {
            const fragment = document.createDocumentFragment();

            for (let index = 0; index < 3; index++) {
                fragment.appendChild(createReviewsTemplate(data[index]));
            }

            appendContent('reviews-block', fragment);
        });
}

init();