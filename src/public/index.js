const socket = io();

// Función para eliminar un producto
const eliminarProducto = (id) => {
    console.log("evento deleteProduct enviado");
    socket.emit('deleteProduct', id);
};

socket.on("products", (products) => {
    try {
        console.log("recibido evento products");

        const productCards = products.map((product) => {
            return `
                <div class="card">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <div><p>$${product.price} - Stock: ${product.stock}</p></div>
                    <button class="delete-btn" data-id="${product.id}">Eliminar</button>
                </div>
            `;
        }).join(" ");

        document.getElementById("card-container").innerHTML = productCards;

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-id');
                eliminarProducto(productId);
            });
        });

    } catch (error) {
        console.error(error);
    }
});

// Formulario para agregar un nuevo producto
document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault(); 

    const newProduct = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        code: document.getElementById('code').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value, 10)
    };

    socket.emit('newProduct', newProduct);

    document.getElementById('form').reset();
});


