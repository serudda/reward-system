import { type CommandInteraction, SlashCommandBuilder } from "discord.js";
// import { getDiscordUserById, getCoinsByDiscordUser } from "../db/discordUser";
import { type SlashCommand, type SlashCommandHandler } from "../types/command";

const execute: SlashCommandHandler = async (
  interaction: CommandInteraction
) => {
  // Get the ID of the user who executed the command
  const userId = interaction.user.id;

  try {
    return interaction.reply({
      content: `Esta es una prueba de ${userId}}`,
      ephemeral: true,
    });
    /* const existingUser = await getDiscordUserById(userId);
    if (!existingUser) {
      return interaction.reply({
        content: `Desafortunadamente, no pudimos encontrar tu perfil.`,
        ephemeral: true,
      });
    }

    const coins = await getCoinsByDiscordUser(existingUser);
    return interaction.reply({
      content: `Tienes ${coins} indieTokens en tu wallet.`,
      ephemeral: true,
    });
    */
  } catch (err) {
    console.error(err);
    return interaction.reply({
      content: `Algo salio mal.`,
      ephemeral: true,
    });
  }
};

const data = new SlashCommandBuilder()
  .setName("wallet")
  .setDescription("Ver cuántos coins tienes acumulados");

const walletCommand: SlashCommand = {
  data,
  execute,
};

export default walletCommand;
