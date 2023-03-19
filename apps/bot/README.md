reference: https://github.com/MericcaN41/discordjs-v14-template-ts

## Configuracion

- Dentro del repo agregar la carpeta .github/workflows, poner ahi dentro el archivo `pull_request.yml`, este sera el Github Action que se ejecutara cuando un PR se mergea exitosamente. Este toma el Issue Number seteado en el titulo del PR.
  <secrets.PROJECT_PREFIX>-<issueNumber>

  **IMPORTANTE:** Si no se respeta el formato del titulo del PR, el action no encontrara el issue number, y por ende los rewards no seran entregados.

  ***

- Crear un Personal Token
  Estos serian los permisos minimos que requeriria el Personal Token para poder asignar los coins correctamente:
  
  ![image 3](https://user-images.githubusercontent.com/10075532/226198581-7e2c34e5-42f7-4882-bdbf-7512ff2408a7.png)
  ![image 4](https://user-images.githubusercontent.com/10075532/226198582-249c7718-5cdf-4782-b9b3-c0bbdc0bc5d3.png)
  ![image 5](https://user-images.githubusercontent.com/10075532/226198584-e39c9021-83b7-4230-b019-bbc4f5989691.png)

  ***

- Crear los SECRETS y VARIABLES correspondientes para que .yml funcione correctamente:

  Se guarda la info mas sensible en SECRETS y la de configuracion en VARIABLES:

  ### Secrets

  `DISCORD_WEBHOOK_URL = ?`

  `PROJECT_TOKEN = ?`

  `MY_PERSONAL_TOKEN = <Personal Token>`

  `ENDPOINT_URL = "https://reward-system-nextjs-wvfw-git-develop-serudda.vercel.app/api/trpc/user.sendCoinsByGithubId?batch=1"`

  reference: https://docs.github.com/en/actions/security-guides/encrypted-secrets

  ### Variables:

  `PROJECT_PREFIX = "RS"`

  `REWARD_FIELD_NAME = "Reward"`

  reference: https://docs.github.com/en/actions/learn-github-actions/variables

  ![image 2](https://user-images.githubusercontent.com/10075532/226198577-0d33ae5b-95a7-4569-8b6d-6aaffdd651c9.png)

  ***

- Crear el respectivo Project dentro de Github, donde se van a gestionar todas las task del repo:

  ![image 6](https://user-images.githubusercontent.com/10075532/226198585-f81808a3-ea07-4314-b59b-7c9d798fe99f.png)
  ![image 7](https://user-images.githubusercontent.com/10075532/226198587-56ccf76a-7e20-4772-80af-89deb6c17fdb.png)
  ![image 8](https://user-images.githubusercontent.com/10075532/226198588-6b891a72-54c4-4d64-9a95-7e51900da62b.png)

  ***

- El Project en el que se vaya a asociar el issue tiene que tener configurado el "custom field" llamado "Reward" (OJO tiene que escribirse igual, sino no entregara los coins)
  https://docs.github.com/en/issues/planning-and-tracking-with-projects/understanding-fields

  ![image 1](https://user-images.githubusercontent.com/10075532/226198576-34fdc984-0354-400d-8633-18524c491cd1.png)
