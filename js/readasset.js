
document.addEventListener("DOMContentLoaded", function () {
    // Obter o parâmetro 'id' da URL
    const params = new URLSearchParams(window.location.search);
    const assetId = params.get("id");

    // Selecionar os elementos HTML para atualizar
    const assetThumbnail = document.getElementById("asset-thumbnail");
    const assetPrint = document.getElementById("asset-print");
    const assetTitle = document.getElementById("asset-title");
    const assetCategory = document.getElementById("asset-category");
    const assetSeries = document.getElementById("asset-series");
    const assetTags = document.getElementById("asset-tags");
    const assetAssets = document.getElementById("asset-assets");
    const assetReleaseDate = document.getElementById("asset-releasedate");
    const assetLicense = document.getElementById("asset-license");
    const assetDownload = document.getElementById("asset-download");

    // Verificar se há um ID de asset válido
    if (assetId) {
        // Fetch no JSON de assets para encontrar o asset com o ID correspondente
        fetch("/json/assets.json") // Substitua pelo caminho correto do seu JSON
            .then((response) => response.json())
            .then((assetsData) => {
                // Encontrar o asset com o ID correspondente
                const asset = assetsData.find((a) => a.id == assetId);

                // Verificar se o asset foi encontrado
                if (asset) {
                    // Atualizar os elementos HTML com as informações do asset
                    assetThumbnail.src = asset.thumbnail;
                    assetThumbnail.alt = asset.title;
                    assetPrint.src = asset.print;
                    assetTitle.textContent = asset.title;
                    assetCategory.textContent = `Category: ${asset.category}`;
                    assetSeries.textContent = `Series: ${asset.series}`;
                    assetTags.textContent = `Tags: ${asset.tags.join(", ")}`;
                    assetAssets.textContent = `Assets: ${asset.assets}`;
                    assetReleaseDate.textContent = `Release Date: ${asset["release-date"]}`;
                    assetLicense.textContent = `License: ${asset.license}`;
                    assetDownload.href = asset.download;
                    assetDownload.textContent = "Download";

                    // Exibir a seção de detalhes do asset
                    document.querySelector(".asset-col").style.display = "block";
                } else {
                    // Se o asset não for encontrado, você pode redirecionar ou exibir uma mensagem de erro
                    console.error("Asset não encontrado.");
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar dados dos assets:", error);
            });
    } else {
        // Se não houver um ID de asset na URL, você pode redirecionar ou exibir uma mensagem de erro
        console.error("ID de asset não especificado na URL.");
    }
});
