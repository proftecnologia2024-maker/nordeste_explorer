/* ============================================================
   NORDESTE EXPLORER - script.js
   PARTE 1: DADOS (edite aqui para adicionar/alterar destinos)
   PARTE 2: LÓGICA (mapa, filtros, busca, lista)
============================================================= */

/* ------------------------------------------------------------
   PARTE 1 - DADOS
   Cada destino tem: id, nome, estado, categoria, descricao, lat, lng.
   Categorias válidas: praias, natureza, cultura, historia, aventura.
   As coordenadas são APROXIMADAS (centro do local ou da cidade-base).
   Antes de apresentar o trabalho, confira cada ponto em
   https://www.openstreetmap.org (clique com o botão direito > "Mostrar endereço").
------------------------------------------------------------ */
const destinos = [
  { id: "ma-saoluis", nome: "Centro Histórico de São Luís", estado: "Maranhão", categoria: "historia",
    descricao: "Conjunto de casarões coloniais com azulejos portugueses, reconhecido como Patrimônio Mundial pela UNESCO.",
    lat: -2.5297, lng: -44.3028 },
  { id: "ma-lencois", nome: "Lençóis Maranhenses (Barreirinhas)", estado: "Maranhão", categoria: "natureza",
    descricao: "Parque Nacional de dunas e lagoas de água da chuva. Barreirinhas é a principal cidade de acesso.",
    lat: -2.7569, lng: -42.8247 },

  { id: "pi-capivara", nome: "Serra da Capivara (São Raimundo Nonato)", estado: "Piauí", categoria: "historia",
    descricao: "Parque Nacional com sítios arqueológicos e pinturas rupestres, Patrimônio Mundial da UNESCO. Ponto marcado: cidade-base.",
    lat: -9.0150, lng: -42.6980 },
  { id: "pi-parnaiba", nome: "Delta do Parnaíba", estado: "Piauí", categoria: "natureza",
    descricao: "Delta em mar aberto com ilhas, dunas e manguezais. Ponto marcado: cidade de Parnaíba, porta de entrada.",
    lat: -2.9055, lng: -41.7769 },

  { id: "ce-iracema", nome: "Praia de Iracema (Fortaleza)", estado: "Ceará", categoria: "praias",
    descricao: "Orla tradicional de Fortaleza, com calçadão, bares e equipamentos culturais.",
    lat: -3.7188, lng: -38.5195 },
  { id: "ce-jeri", nome: "Jericoacoara", estado: "Ceará", categoria: "aventura",
    descricao: "Vila e Parque Nacional com dunas e praias, conhecida por kitesurf, windsurf e passeios de buggy.",
    lat: -2.7970, lng: -40.5130 },

  { id: "rn-ponta-negra", nome: "Praia de Ponta Negra (Natal)", estado: "Rio Grande do Norte", categoria: "praias",
    descricao: "Praia urbana de Natal, com vista para o Morro do Careca.",
    lat: -5.8830, lng: -35.1760 },
  { id: "rn-pipa", nome: "Praia da Pipa (Tibau do Sul)", estado: "Rio Grande do Norte", categoria: "praias",
    descricao: "Vila litorânea com falésias, praias e passeios para observar golfinhos.",
    lat: -6.2280, lng: -35.0460 },

  { id: "pb-seixas", nome: "Ponta do Seixas (João Pessoa)", estado: "Paraíba", categoria: "praias",
    descricao: "Extremo leste das Américas, com falésia e praia em João Pessoa.",
    lat: -7.1489, lng: -34.7931 },
  { id: "pb-campina", nome: "Campina Grande", estado: "Paraíba", categoria: "cultura",
    descricao: "Cidade conhecida pelo São João, uma das maiores festas juninas do país.",
    lat: -7.2306, lng: -35.8811 },

  { id: "pe-olinda", nome: "Sítio Histórico de Olinda", estado: "Pernambuco", categoria: "historia",
    descricao: "Ladeiras, igrejas e casarios coloniais; Patrimônio Mundial da UNESCO e cenário do carnaval de rua.",
    lat: -8.0089, lng: -34.8553 },
  { id: "pe-noronha", nome: "Fernando de Noronha", estado: "Pernambuco", categoria: "natureza",
    descricao: "Arquipélago e Parque Nacional Marinho, com praias e mergulho. Há regras de visitação e taxas de preservação oficiais.",
    lat: -3.8549, lng: -32.4239 },

  { id: "al-maragogi", nome: "Maragogi", estado: "Alagoas", categoria: "praias",
    descricao: "Litoral norte alagoano, conhecido pelas piscinas naturais de recifes, as Galés.",
    lat: -9.0122, lng: -35.2225 },
  { id: "al-pajucara", nome: "Praia de Pajuçara (Maceió)", estado: "Alagoas", categoria: "praias",
    descricao: "Praia urbana de Maceió, ponto de partida de passeios de jangada às piscinas naturais.",
    lat: -9.6658, lng: -35.7353 },

  { id: "se-saocristovao", nome: "São Cristóvão", estado: "Sergipe", categoria: "historia",
    descricao: "Uma das cidades mais antigas do Brasil; sua Praça São Francisco é Patrimônio Mundial da UNESCO.",
    lat: -11.0147, lng: -37.2058 },
  { id: "se-xingo", nome: "Cânions do Xingó (Canindé de São Francisco)", estado: "Sergipe", categoria: "aventura",
    descricao: "Cânions do Rio São Francisco, com passeios de barco. Ponto marcado: cidade de Canindé de São Francisco.",
    lat: -9.6406, lng: -37.7867 },

  { id: "ba-pelourinho", nome: "Pelourinho (Salvador)", estado: "Bahia", categoria: "cultura",
    descricao: "Centro Histórico de Salvador, com arquitetura colonial, igrejas e forte presença da cultura afro-brasileira.",
    lat: -12.9714, lng: -38.5108 },
  { id: "ba-chapada", nome: "Chapada Diamantina (Lençóis)", estado: "Bahia", categoria: "aventura",
    descricao: "Parque Nacional com serras, cachoeiras e grutas, popular para trilhas. Lençóis é a cidade-base.",
    lat: -12.5625, lng: -41.3894 }
];

/* Nome e cor de cada categoria (a cor também aparece no CSS via variável --cor) */
const categorias = {
  praias:   { nome: "Praias",   cor: "#0b5d8a" },
  natureza: { nome: "Natureza", cor: "#1f8a5b" },
  cultura:  { nome: "Cultura",  cor: "#8e44ad" },
  historia: { nome: "História", cor: "#b9770e" },
  aventura: { nome: "Aventura", cor: "#e8573d" }
};

/* ------------------------------------------------------------
   PARTE 2 - LÓGICA
------------------------------------------------------------ */

/* 2.1 Cria o mapa centralizado no Nordeste (centro aproximado e zoom 6) */
const mapa = L.map("mapa").setView([-8.5, -39.0], 6);

/* 2.2 Camada de mapa do OpenStreetMap (gratuita, sem chave).
   A atribuição é obrigatória pelas regras de uso do OSM. */
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

/* 2.3 Referências aos elementos do HTML */
const campoBusca = document.getElementById("busca");
const listaEl = document.getElementById("lista");
const mensagemEl = document.getElementById("mensagem");
const botoesFiltro = document.querySelectorAll(".filtro");

/* Estado atual da página */
let categoriaAtiva = "todos";
const marcadores = {};              // guarda cada marcador pelo id do destino
const grupoMarcadores = L.layerGroup().addTo(mapa);

/* 2.4 Monta o link de rota (Google Maps, sem chave de API) */
function linkRota(d) {
  return "https://www.google.com/maps/dir/?api=1&destination=" + d.lat + "," + d.lng;
}

/* 2.5 Cria o conteúdo HTML do balão do marcador */
function htmlPopup(d) {
  return '<div class="popup">' +
    "<h3>" + d.nome + "</h3>" +
    '<p class="meta">' + d.estado + " · " + categorias[d.categoria].nome + "</p>" +
    "<p>" + d.descricao + "</p>" +
    '<a class="btn-rota" href="' + linkRota(d) + '" target="_blank" rel="noopener">Abrir rota</a>' +
    "</div>";
}

/* 2.6 Cria um marcador colorido para um destino */
function criarMarcador(d) {
  const icone = L.divIcon({
    className: "",
    html: '<div class="pino" style="--cor:' + categorias[d.categoria].cor + '"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });
  const m = L.marker([d.lat, d.lng], { icon: icone, title: d.nome, alt: d.nome });
  m.bindPopup(htmlPopup(d));
  m.on("click", function () { destacarCartao(d.id); });
  return m;
}

/* 2.7 Destaca o cartão da lista correspondente */
function destacarCartao(id) {
  document.querySelectorAll(".cartao").forEach(function (c) {
    c.classList.toggle("selecionado", c.dataset.id === id);
  });
}

/* 2.8 Seleciona um destino (clique na lista): centraliza o mapa e abre o balão */
function selecionarDestino(d) {
  mapa.flyTo([d.lat, d.lng], 11, { duration: 1.2 });
  marcadores[d.id].openPopup();
  destacarCartao(d.id);
  // No celular, rola a página até o mapa
  if (window.innerWidth <= 700) {
    document.getElementById("mapa").scrollIntoView({ behavior: "smooth" });
  }
}

/* 2.9 Retorna os destinos que passam pela busca E pelo filtro */
function destinosFiltrados() {
  const termo = campoBusca.value.trim().toLowerCase();
  return destinos.filter(function (d) {
    const porCategoria = categoriaAtiva === "todos" || d.categoria === categoriaAtiva;
    const porNome = d.nome.toLowerCase().includes(termo);
    return porCategoria && porNome;
  });
}

/* 2.10 Redesenha lista e marcadores conforme busca/filtro */
function atualizar() {
  const resultado = destinosFiltrados();

  listaEl.innerHTML = "";
  grupoMarcadores.clearLayers();

  // Mensagem quando nada é encontrado
  if (resultado.length === 0) {
    mensagemEl.textContent = "Nenhum destino encontrado. Tente outro nome ou escolha outra categoria.";
    mensagemEl.classList.add("erro");
    return;
  }
  mensagemEl.classList.remove("erro");
  mensagemEl.textContent = resultado.length + (resultado.length === 1 ? " destino encontrado." : " destinos encontrados.");

  resultado.forEach(function (d) {
    // Marcador no mapa (criado uma vez e reaproveitado)
    if (!marcadores[d.id]) { marcadores[d.id] = criarMarcador(d); }
    grupoMarcadores.addLayer(marcadores[d.id]);

    // Cartão na lista (botão = acessível por teclado)
    const li = document.createElement("li");
    const cartao = document.createElement("button");
    cartao.className = "cartao";
    cartao.type = "button";
    cartao.dataset.id = d.id;
    cartao.style.setProperty("--cor", categorias[d.categoria].cor);
    cartao.innerHTML =
      "<h2>" + d.nome + "</h2>" +
      '<p class="meta">' + d.estado + " · " + categorias[d.categoria].nome + "</p>" +
      "<p>" + d.descricao + "</p>";
    cartao.addEventListener("click", function () { selecionarDestino(d); });
    li.appendChild(cartao);
    listaEl.appendChild(li);
  });
}

/* 2.11 Eventos: digitar na busca e clicar nos filtros */
campoBusca.addEventListener("input", atualizar);

botoesFiltro.forEach(function (botao) {
  botao.addEventListener("click", function () {
    categoriaAtiva = botao.dataset.cat;
    botoesFiltro.forEach(function (b) {
      const ativo = b === botao;
      b.classList.toggle("ativo", ativo);
      b.setAttribute("aria-pressed", ativo);
    });
    atualizar();
  });
});

/* 2.12 Primeira exibição */
atualizar();
