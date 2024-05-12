function cargar_ftr(){
    let footer = document.querySelector(".footer")
footer.innerHTML = `
<div class="caja">
    <div class="cj">
        <h2>Company</h2>
        <span>About Us</span>
        <span>Why Choose us</span>
        <span>Pricing</span>
        <span>Testimonial</span>
    </div>
    <div class="cj">
        <h2>Resources</h2>
        <span>Privacy Policy</span>
        <span>Terms and Condition</span>
        <span>Blog</span>
        <span>Contact Us</span>
    </div>
    <div class="cj">
        <h2>Product</h2>
        <span>Protect managment</span>
        <span>Time tracker</span>
        <span>Time schedule</span>
        <span>Lead generate</span>
        <span>Remote Collaboration</span>
    </div>
    <div class="cj1">
        <h1>Site Title</h1>
        <h2>Suscribe to our Newsletter</h2>
        <div class="mail">
            <input type="text" placeholder="Enter your Email">
            <div class="btn">Suscribe</div>
        </div>
    </div>
</div>
<div class="end">
    <div class="ln1"></div>
    <h2>Copyrigth @2024</h2>
    <div class="imgs1">
        <img src="https://github.com/gODHyDRaX/img_tienda_api/blob/main/Vector.png?raw=true" alt="">
        <img src="https://github.com/gODHyDRaX/img_tienda_api/blob/main/Twitter.png?raw=true" alt="">
        <img src="https://github.com/gODHyDRaX/img_tienda_api/blob/main/Instagram.png?raw=true" alt="">
        <img src="https://github.com/gODHyDRaX/img_tienda_api/blob/main/LinkedIn.png?raw=true" alt="">
    </div>
<div class="ln2"></div>
</div>
`
}
export {cargar_ftr}