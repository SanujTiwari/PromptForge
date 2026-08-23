import app from './app';
import { env } from './config/env';

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`\n🚀 PromptForge API Server`);
  console.log(`   Environment: ${env.NODE_ENV}`);
  console.log(`   Port:        ${PORT}`);
  console.log(`   Health:      http://localhost:${PORT}/api/health`);
  console.log(`   Ready!\n`);
});
