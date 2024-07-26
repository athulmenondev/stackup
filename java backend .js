from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)

# Simulated database for products
products = [
    {"id": 1, "name": "Product 1", "price": 10.00},
    {"id": 2, "name": "Product 2", "price": 20.00},
    # Add more products here
]


cart = []

@app.route('/')
def home():
    return render_template('index.html', products=products)

@app.route('/add_to_cart/<int:product_id>')
def add_to_cart(product_id):
    product = next((p for p in products if p["id"] == product_id), None)
    if product:
        cart.append(product)
    return redirect(url_for('home'))

    @app.route('/cart')
    def view_cart():
        total_price = sum(product["price"] for product in cart)
        return render_template('cart.html', cart=cart, total_price=total_price)
    
    @app.route('/checkout')
    def checkout():
        # You can add payment processing logic here
        cart.clear()
        return "Checkout Successful!"
    
    if __name__ == '__main__':
        app.run(debug=True)
    
    
    