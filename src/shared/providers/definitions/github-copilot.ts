import { ModelProviderType } from '../../types'
import { defineProvider } from '../registry'
import OpenAI from './models/openai'

export const githubCopilotProvider = defineProvider({
  id: 'github-copilot',
  name: 'GitHub Copilot',
  type: ModelProviderType.OpenAI,
  modelsDevProviderId: 'github-copilot',
  curatedModelIds: ['gpt-4o', 'gpt-4.1', 'claude-3.5-sonnet'],
  urls: {
    website: 'https://github.com/features/copilot',
    docs: 'https://docs.github.com/copilot',
  },
  defaultSettings: {
    apiHost: 'https://api.githubcopilot.com',
    models: [
      {
        modelId: 'gpt-4o',
        capabilities: ['vision', 'tool_use'],
        contextWindow: 128_000,
        maxOutput: 4_096,
      },
      {
        modelId: 'gpt-4.1',
        capabilities: ['vision', 'tool_use'],
        contextWindow: 128_000,
        maxOutput: 4_096,
      },
      {
        modelId: 'claude-3.5-sonnet',
        capabilities: ['vision', 'tool_use'],
        contextWindow: 200_000,
        maxOutput: 8_192,
      },
    ],
  },
  createModel: (config) => {
    return new OpenAI(
      {
        apiKey: config.effectiveApiKey,
        apiHost: config.formattedApiHost,
        model: config.model,
        dalleStyle: config.settings.dalleStyle || 'vivid',
        temperature: config.settings.temperature,
        topP: config.settings.topP,
        maxOutputTokens: config.settings.maxTokens,
        injectDefaultMetadata: config.globalSettings.injectDefaultMetadata,
        useProxy: false,
        stream: config.settings.stream,
      },
      config.dependencies
    )
  },
  getDisplayName: (modelId, providerSettings) => {
    return `GitHub Copilot (${providerSettings?.models?.find((m) => m.modelId === modelId)?.nickname || modelId})`
  },
})
