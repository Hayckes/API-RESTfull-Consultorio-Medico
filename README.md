# API de Controle de Consultas Médicas - README

Bem-vindo ao projeto MVP da API de Controle de Consultas Médicas da CUBOS! Nossa missão é fornecer uma solução inicial que permita criar, listar, atualizar, excluir, finalizar e acessar informações relacionadas a consultas médicas em um consultório médico. Este é apenas o primeiro passo de um projeto mais amplo, no qual adicionaremos mais funcionalidades no futuro.

## Visão Geral

Esta API foi desenvolvida para gerenciar consultas médicas em um consultório. Ela fornece endpoints RESTful para executar operações básicas relacionadas a consultas médicas e laudos. Aqui estão as principais funcionalidades oferecidas:

1. **Criar Consulta Médica**
   - **URL:** `/api/consultas`
   - **Método:** POST
   - **Descrição:** Cria uma nova consulta médica com informações como nome do paciente, data da consulta, médico responsável e motivo da consulta.

2. **Listar Consultas Médicas**
   - **URL:** `/api/consultas`
   - **Método:** GET
   - **Descrição:** Retorna uma lista de todas as consultas médicas registradas, incluindo informações como data, paciente e médico.

3. **Atualizar Dados de uma Consulta**
   - **URL:** `/api/consultas/{id}`
   - **Método:** PUT
   - **Descrição:** Permite atualizar informações de uma consulta médica existente com base no ID fornecido, como a data da consulta ou o motivo.

4. **Excluir uma Consulta Médica**
   - **URL:** `/api/consultas/{id}`
   - **Método:** DELETE
   - **Descrição:** Permite excluir uma consulta médica com base no ID fornecido.

5. **Finalizar uma Consulta Médica**
   - **URL:** `/api/consultas/{id}/finalizar`
   - **Método:** POST
   - **Descrição:** Marca uma consulta médica como finalizada com base no ID fornecido.

6. **Listar o Laudo de uma Consulta**
   - **URL:** `/api/consultas/{id}/laudo`
   - **Método:** GET
   - **Descrição:** Retorna o laudo de uma consulta médica com base no ID fornecido.

7. **Listar as Consultas Atendidas por um Médico**
   - **URL:** `/api/medicos/{id}/consultas`
   - **Método:** GET
   - **Descrição:** Retorna uma lista de consultas médicas atendidas por um médico específico com base no ID do médico.

