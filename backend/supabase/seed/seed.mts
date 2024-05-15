/**
 * ! Executing this script will delete all data in your database and seed it with 10 versions.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.mts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";

const seed = await createSeedClient();

// Truncate all tables in the database
await seed.$resetDatabase();

// Seed the db with default project_types.
await seed.project_types([
  { name: 'Audit' },
  { name: 'Evaluation' },
  { name: 'Evaluation Study' },
  { name: 'Horizontal Evaluation' },
  { name: 'OAG_Audit' },
  { name: 'Audit Review' },
  { name: 'OPO Audit' },
  { name: 'PSC Audit' },
  { name: 'Scoping Exercise' },
  { name: 'Other' }
])

// TODO: For some reasons, running this script is hanging on node 20... I've populate seed.sql manually for now.
