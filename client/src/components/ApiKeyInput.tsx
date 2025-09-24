import { useState } from 'react';
import { Key, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ApiKeyInputProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

export default function ApiKeyInput({ apiKey, onApiKeyChange }: ApiKeyInputProps) {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="text-center mb-6">
          <Key className="w-12 h-12 text-gray-600 mb-4 mx-auto" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">API Configuration</h3>
          <p className="text-gray-600">Enter your Google Gemini API key to enable AI-powered analysis</p>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <Label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-2">
              Google Gemini API Key
            </Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                className="w-full pr-20"
                placeholder="Enter your API key..."
                data-testid="api-key-input"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-12 top-0 h-full px-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowApiKey(!showApiKey)}
                data-testid="toggle-api-key-visibility"
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            {apiKey && (
              <div className="flex items-center mt-2">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-green-600" data-testid="api-key-status">
                  API key configured successfully
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
