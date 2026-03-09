import pkg from "enquirer";
const { Select, Input } = pkg as any;

const estoque = [
    { id: 101, produto: "Monitor LED", status: "pendente" },
    { id: 102, produto: "Teclado Mecânico", status: "entregue" },
    { id: 103, produto: "Mouse Gamer", status: "pendente" },
    { id: 104, produto: "Cadeira Ergonômica", status: "entregue" },
    { id: 105, produto: "Webcam Full HD", status: "pendente" },
    { id: 106, produto: "Headset Gamer", status: "entregue" },
    { id: 107, produto: "Placa de Vídeo", status: "pendente" },
    { id: 108, produto: "Processador", status: "entregue" },
    { id: 109, produto: "Memória RAM", status: "pendente" },
    { id: 110, produto: "SSD NVMe", status: "entregue" },
];

const idsCadastrados = new Set(estoque.map(item => item.id));

async function main() {
    let rodando = true;

    while (rodando) {
        const menu = new Select({
            name: "acao",
            message: "Selecione uma ação:",
            choices: [
                "1 - Ver Estoque", 
                "2 - Atualizar Status", 
                "3 - Descarregar último item",
                "4 - Processar primeiro item",
                "5 - Adicionar Item",
                "0 - Sair"
            ],
        });

        const escolha = await menu.run();

        switch (escolha.charAt(0)) {
            case "1":
                console.log(`\n--- Estoque Atual ---`);
                for (const item of estoque) {
                    console.log(
                        `ID: ${item.id} | Produto: ${item.produto} | Status: ${item.status}`,
                    );
                }
                break;

            case "2":
                const pendentes = estoque.filter(
                    (item) => item.status === "pendente",
                );
                console.log(`\n--- Produtos Pendentes ---`);
                console.table(pendentes);
                break;

            case "3":
                if (estoque.length > 0) {
                    const removido = estoque.pop();
                    idsCadastrados.delete(removido!.id);
                    console.log(`\nDescarregado: "${removido?.produto}"`);
                } else {
                    console.log("\nEstoque vazio. Nada para descarregar.");
                }
                break;

            case "4":
                if (estoque.length > 0) {
                    const removidoFila = estoque.shift();
                    console.log(`\nProcessando: "${removidoFila?.produto}"`);
                } else {
                    console.log("\nEstoque vazio. Nada para processar.");
                }
                break;

            case "5":
                const idInput = new Input({ message: "Digite o ID do produto:" });
                const nomeInput = new Input ({ message: "Digite o nome do produto:" });

                const idDigitado = Number(await idInput.run());
                const nomeDigitado = await nomeInput.run();

                if (idsCadastrados.has(idDigitado)) {
                    console.log("\nID já cadastrado. Tente novamente.");
                } else if (isNaN(idDigitado)) {
                    console.log("\nID inválido. Digite um número.");
                } else {
                    estoque.push({ id: idDigitado, produto: nomeDigitado, status: "pendente" });
                    idsCadastrados.add(idDigitado);
                    console.log(`\nProduto "${nomeDigitado}" adicionado com ID ${idDigitado}.`);
                }
                break;

            case "0":
                console.log("Encerrando... Até mais!");
                return;
        }
    }
}

main();
