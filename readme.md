# Intruções

1. Rode o script ```npm run createKeys``` dentro de ./backend para gerar o par de chaves para a api do Starkbank. As variáveis serão armazenadas em ./backend/keys
2. Depois cadastre sua chave pública do projeto na plataforma dentro de integrações
3. Defina as variáveis de ambiente em ./backend/config/config.env, para isso substitua os valores:
     ```
      PORT=3000
      EMAIL_SENDER=value
      SENDER_PASSWORD=value
      SLACK_BOT_TOKEN=value
      SLACK_SIGNING_SECRET=value
      URL_ENDPOINT=http://localhost:3000/
     ```
     OBS: No momento, o app está configurado apenas para execução local
5. Os boletos em PDF gerados ficam armazenados em ./backend/boletoFiles
6. Use o script ```npm run dev``` para executar o servidor dentro do path ./backend
7. Por fim, lembre de conceder permissão ao projeto para que ele acesse o centro de pagamento desejado, necessário no uso da funcionalidade de integração com o slack para emissão de relatórios de boletos
8. Para mais informações, acesse o relatório presente neste repositório e a documentação da API do Starkbank (https://starkbank.com/docs/api)
