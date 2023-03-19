reference: https://github.com/MericcaN41/discordjs-v14-template-ts

## Configuracion

- Dentro del repo agregar la carpeta .github/workflows, poner ahi dentro el archivo `pull_request.yml`, este sera el Github Action que se ejecutara cuando un PR se mergea exitosamente. Este toma el Issue Number seteado en el titulo del PR.
  <secrets.PROJECT_PREFIX>-<issueNumber>

  **IMPORTANTE:** Si no se respeta el formato del titulo del PR, el action no encontrara el issue number, y por ende los rewards no seran entregados.

  ***

- Crear un Personal Token
  Estos serian los permisos minimos que requeriria el Personal Token para poder asignar los coins correctamente:
  <image 3>
  <image 4>
  <image 5>

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

  <image 2>

  ***

- Crear el respectivo Project dentro de Github, donde se van a gestionar todas las task del repo:

  <image 6>
  <image 7>
  <image 8>

  ***

- El Project en el que se vaya a asociar el issue tiene que tener configurado el "custom field" llamado "Reward" (OJO tiene que escribirse igual, sino no entregara los coins)
  https://docs.github.com/en/issues/planning-and-tracking-with-projects/understanding-fields

  <image 1>
