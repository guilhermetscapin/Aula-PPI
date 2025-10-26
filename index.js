import express from "express";

const server = express();
const host = "localhost";
const porta = 3000;

server.get("/", (req, res) => {
    const { idade, sexo, salario_base, anoContratacao, matricula } = req.query;

    if (!idade && !sexo && !salario_base && !anoContratacao && !matricula) {
        res.send(`
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Reajuste Salarial</title>
        </head>
        <body>
          <h1>Cálculo de Reajuste Salarial</h1>
          <p>Coloque os dados na URL conforme o exemplo:</p>
          <pre>http://localhost:3000/?idade=30&sexo=F&salario_base=1700&anoContratacao=2014&matricula=12345</pre>
        </body>
      </html>
    `);
        return;
    }

    const idadeNum = Number(idade);
    const salarioNum = Number(salario_base);
    const anoNum = Number(anoContratacao);
    const matriculaNum = Number(matricula);

    const anoAtual = new Date().getFullYear();
    const anosEmpresa = anoAtual - anoNum;

    if (
        isNaN(idadeNum) ||
        isNaN(salarioNum) ||
        isNaN(anoNum) ||
        isNaN(matriculaNum) ||
        idadeNum <= 16 ||
        salarioNum <= 0 ||
        anoNum <= 1960 ||
        matriculaNum <= 0 ||
        (sexo !== "M" && sexo !== "F")
    ) {
        res.send(`
      <html>
        <head><meta charset="UTF-8"><title>Erro</title></head>
        <body>
          <h1 style="color:red;">Dados inválidos!</h1>
          <p>Verifique se todos os parâmetros foram informados corretamente.</p>
        </body>
      </html>
    `);
        return;
    }

    let reajuste = 0;
    let desconto = 0;
    let acrescimo = 0;

    if (idadeNum >= 18 && idadeNum <= 39) {
        reajuste = sexo === "M" ? 0.1 : 0.08;
        desconto = sexo === "M" ? 10 : 11;
        acrescimo = sexo === "M" ? 17 : 16;
    } else if (idadeNum >= 40 && idadeNum <= 69) {
        reajuste = sexo === "M" ? 0.08 : 0.1;
        desconto = sexo === "M" ? 5 : 7;
        acrescimo = sexo === "M" ? 15 : 14;
    } else if (idadeNum >= 70 && idadeNum <= 99) {
        reajuste = sexo === "M" ? 0.15 : 0.17;
        desconto = sexo === "M" ? 15 : 17;
        acrescimo = sexo === "M" ? 13 : 12;
    }

    let salarioReajustado =
        salarioNum + salarioNum * reajuste + (anosEmpresa <= 10 ? -desconto : acrescimo);

    res.send(`
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Resultado do Reajuste</title>
      </head>
      <body>
        <h1>Reajuste Calculado</h1>
        <p><strong>Matrícula:</strong> ${matriculaNum}</p>
        <p><strong>Idade:</strong> ${idadeNum}</p>
        <p><strong>Sexo:</strong> ${sexo}</p>
        <p><strong>Salário Base:</strong> R$${salarioNum.toFixed(2)}</p>
        <p><strong>Ano de Contratação:</strong> ${anoNum}</p>
        <p><strong>Anos de Empresa:</strong> ${anosEmpresa}</p>
        <hr>
        <h2 style="color:blue;">Salário Reajustado: R$${salarioReajustado.toFixed(2)}</h2>
      </body>
    </html>
  `);
});

server.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
});
