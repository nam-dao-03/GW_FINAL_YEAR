export default async function migrateDbIfNeeded(db) {
  const DATABASE_VERSION = 1;

  const result = await db.getFirstAsync("PRAGMA user_version");
  let currentDbVersion = result.user_version;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
    `);

    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
