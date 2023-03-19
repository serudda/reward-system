reference: https://github.com/MericcaN41/discordjs-v14-template-ts

Flujo de Github Reward

- El Project en el que se vaya a asociar el issue tiene que tener configurado el "custom field" llamado "Reward" (OJO tiene que escribirse igual, sino no entregara los coins)
  https://docs.github.com/en/issues/planning-and-tracking-with-projects/understanding-fields

<image 1>

- Para que el proyecto funcione coprrectamente es necesario agregar los siguientes SECRETS dentro del repo que va a otorgar coins:

<image 2>

PROJECT_PREFIX = "RS"
REWARD_FIELD_NAME = "Reward"
MY_PERSONAL_TOKEN = <Personal Token>
ENDPOINT_URL = "https://reward-system-nextjs-wvfw-git-develop-serudda.vercel.app/api/trpc/user.sendCoinsByGithubId?batch=1"

Personal Token:
Estos serian los permisos minimos que requeriria el Personal Token para poder asignar los coins correctamente:

<image 3>
<image 4>
<image 5>

Configuration:

- Dentro del repo agregar la carpeta .github/workflows, poner ahi dentro el archivo `pull_request.yml`, este sera el Github Action que se ejecutara cuando un PR se mergea exitosamente. Este toma el Issue Number seteado en el titulo del PR.
  <secrets.PROJECT_PREFIX>-<issueNumber>

IMPORTANTE: Si no se respeta el formato, el action no encontrara el issue number, y por ende los rewards no seran entregados.
