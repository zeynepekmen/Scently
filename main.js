
const perfumes = [
    {id:1, name:"Dior Sauvage", scent:85, usage:90, priceScore:65, price:4500, volume:100},
    {id:2, name:"YSL Libre", scent:90, usage:85, priceScore:70, price:3800, volume:90},
    {id:3, name:"Chanel Coco Mademoiselle", scent:95, usage:90, priceScore:55, price:5200, volume:100},
    {id:4, name:"Dior J'adore", scent:88, usage:90, priceScore:60, price:4900, volume:100},
    {id:5, name:"Valentino Donna Born in Roma", scent:92, usage:85, priceScore:65, price:4600, volume:100},
    {id:6, name:"Bleu de Chanel", scent:90, usage:95, priceScore:60, price:5100, volume:100},
    {id:7, name:"Jean Paul Gaultier Le Male Le Parfum", scent:88, usage:85, priceScore:70, price:4200, volume:125},
    {id:8, name:"Versace Eros", scent:85, usage:90, priceScore:75, price:3500, volume:100},
    {id:9, name:"Baccarat Rouge 540", scent:95, usage:85, priceScore:45, price:8500, volume:70},
    {id:10, name:"Tom Ford Oud Wood", scent:90, usage:80, priceScore:50, price:9000, volume:100},
    {id:11, name:"Jo Malone Wood Sage & Sea Salt", scent:85, usage:90, priceScore:60, price:5500, volume:100},
    {id:12, name:"YSL Tuxedo", scent:92, usage:85, priceScore:50, price:9500, volume:75}
];

// Seçim kutularına parfümleri ekler.
const firstSelect = document.getElementById("perfume-one");
const secondSelect = document.getElementById("perfume-two");
const form = document.getElementById("comparison-form");
const result = document.getElementById("comparison-result");

perfumes.forEach(perfume => {
    [firstSelect, secondSelect].forEach(select => {
        select.add(new Option(perfume.name, perfume.id));
    });
});

// Parfüm puanını hesaplar.
function calculateScore(perfume, weights) {
    return (
        perfume.scent * weights.scent +
        perfume.usage * weights.usage +
        perfume.priceScore * weights.price
    ) / 100;
}

// Karşılaştırma işlemini yapar.
form.addEventListener("submit", event => {
    event.preventDefault();

    try {
        const first = perfumes.find(p => p.id === Number(firstSelect.value));
        const second = perfumes.find(p => p.id === Number(secondSelect.value));

        const weights = {
            scent: Number(document.getElementById("scent-weight").value),
            usage: Number(document.getElementById("usage-weight").value),
            price: Number(document.getElementById("price-weight").value)
        };

        if (!first || !second) {
            throw new Error("İki parfüm de seçilmelidir.");
        }

        if (first.id === second.id) {
            throw new Error("Farklı iki parfüm seçmelisin.");
        }

        const values = Object.values(weights);

        if (values.some(w => !Number.isFinite(w) || w < 0 || w > 100) ||
            values.reduce((a, b) => a + b, 0) !== 100) {
            throw new Error("Yüzdelerin toplamı 100 olmalıdır.");
        }

        const score1 = calculateScore(first, weights);
        const score2 = calculateScore(second, weights);

        const winner = score1 === score2
            ? "Puanlar eşit."
            : `${score1 > score2 ? first.name : second.name} daha yüksek puan aldı.`;

        result.innerHTML = `
            <h3>Karşılaştırma Sonucu</h3>
            <p>${first.name}: ${score1.toFixed(1)} puan | ${(first.price / first.volume).toFixed(2)} TL/ml</p>
            <p>${second.name}: ${score2.toFixed(1)} puan | ${(second.price / second.volume).toFixed(2)} TL/ml</p>
            <h4>${winner}</h4>
        `;

    } catch (error) {
        result.textContent = error.message;
    }
});


