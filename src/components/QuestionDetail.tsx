import React, { useState, useEffect } from 'react';
import { ArrowLeft, Eye, Code, Clock, CheckCircle, Copy, FileCode, FileText, File as FileIcon, Folder, Star, GitBranch, Search as SearchIcon, Moon, Sun, Server, Database, Shield, Zap, Network, Target, MessageSquare, Brain } from 'lucide-react';
import { Question } from '../data/questions';
import ViewTracker from '../utils/viewTracker';

// GitHub-like repo browser for LLD files
const RepoBrowser: React.FC<{ question: Question }> = ({ question }) => {
  const name = (question.title || 'lld')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const buildFilesForQuestion = (q: Question): { name: string; content: string }[] => {
    const title = q.title.toLowerCase();

    if (title.includes('perplexity')) {
      return [
        { name: 'perplexity-clone/README.md', content: '# Perplexity Clone – Production Architecture\n\n...\n' },
        { name: 'perplexity-clone/backend/api-gateway/package.json', content: '{"name":"api-gateway"}' },
        { name: 'perplexity-clone/backend/api-gateway/src/index.ts', content: '/* api gateway entry */' },
        { name: 'perplexity-clone/backend/api-gateway/src/routes/search.ts', content: '/* routes */' },
        { name: 'perplexity-clone/backend/api-gateway/src/middleware/auth.ts', content: '/* auth */' },
        { name: 'perplexity-clone/backend/api-gateway/src/middleware/rateLimit.ts', content: '/* ratelimit */' },
        { name: 'perplexity-clone/backend/api-gateway/src/utils/logger.ts', content: '/* logger */' },
        { name: 'perplexity-clone/backend/query-service/requirements.txt', content: 'fastapi==0.115.0' },
        { name: 'perplexity-clone/backend/query-service/src/query_parser.py', content: 'def normalize(x): ...' },
        { name: 'perplexity-clone/backend/query-service/src/retriever.py', content: 'async def hybrid_retrieve(...): ...' },
        { name: 'perplexity-clone/backend/query-service/src/ranker.py', content: 'def hybrid_score(...): ...' },
        { name: 'perplexity-clone/backend/query-service/src/service.py', content: 'from fastapi import FastAPI\n...' },
        { name: 'perplexity-clone/backend/crawling-service/requirements.txt', content: 'scrapy==2.11.2' },
        { name: 'perplexity-clone/backend/crawling-service/src/crawler.py', content: 'async def crawl(...): ...' },
        { name: 'perplexity-clone/backend/crawling-service/src/cleaner.py', content: 'def clean_html(...): ...' },
        { name: 'perplexity-clone/backend/crawling-service/src/scheduler.py', content: 'class Scheduler: ...' },
        { name: 'perplexity-clone/backend/crawling-service/src/storage.py', content: 'async def store_raw(...): ...' },
        { name: 'perplexity-clone/backend/indexing-service/requirements.txt', content: 'sentence-transformers==3.2.0' },
        { name: 'perplexity-clone/backend/indexing-service/src/embeddings.py', content: 'def embed(...): ...' },
        { name: 'perplexity-clone/backend/indexing-service/src/indexer.py', content: 'async def upsert(...): ...' },
        { name: 'perplexity-clone/backend/indexing-service/src/sync_worker.py', content: 'async def run(): ...' },
        { name: 'perplexity-clone/backend/llm-service/requirements.txt', content: 'openai==1.44.0' },
        { name: 'perplexity-clone/backend/llm-service/src/prompt_templates/system.md', content: 'You are a grounded answerer...' },
        { name: 'perplexity-clone/backend/llm-service/src/answer_builder.py', content: 'def build_answer(...): ...' },
        { name: 'perplexity-clone/backend/llm-service/src/summarizer.py', content: 'async def summarize(...): ...' },
        { name: 'perplexity-clone/backend/llm-service/src/service.py', content: 'from fastapi import FastAPI\n...' },
        { name: 'perplexity-clone/backend/auth-service/package.json', content: '{"name":"auth-service"}' },
        { name: 'perplexity-clone/backend/auth-service/src/user_model.js', content: 'export const User = {}' },
        { name: 'perplexity-clone/backend/auth-service/src/auth_routes.js', content: 'export function attachAuth(){}' },
        { name: 'perplexity-clone/backend/auth-service/src/token_manager.js', content: 'export function sign(){}' },
        { name: 'perplexity-clone/backend/common/logger.js', content: 'export const log=()=>{}' },
        { name: 'perplexity-clone/backend/common/config.js', content: 'export const config={}' },
        { name: 'perplexity-clone/backend/common/constants.js', content: 'export const CONSTANTS={}' },
        { name: 'perplexity-clone/backend/common/errors.js', content: 'export class UpstreamError extends Error{}' },
        { name: 'perplexity-clone/frontend/package.json', content: '{"name":"perplexity-frontend"}' },
        { name: 'perplexity-clone/frontend/pages/index.tsx', content: 'export default function Home(){return null}' },
        { name: 'perplexity-clone/infra/docker/Dockerfile.api-gateway', content: 'FROM node:20-alpine' },
        { name: 'perplexity-clone/infra/k8s/deployments.yaml', content: 'apiVersion: apps/v1' },
        { name: 'perplexity-clone/infra/terraform/main.tf', content: '# terraform' },
        { name: 'perplexity-clone/infra/ci-cd/github-actions.yaml', content: 'name: ci' },
        { name: 'perplexity-clone/scripts/dev.sh', content: '#!/usr/bin/env bash' },
        { name: 'perplexity-clone/docs/architecture.md', content: '# Architecture' },
        { name: 'perplexity-clone/tests/e2e.http', content: 'POST /search' },
      ];
    } else if (title.includes('elevenlabs')) {
      return [
        { name: 'elevenlabs-clone/README.md', content: '# ElevenLabs Clone – AI Voice Generation Platform\n\n...\n' },
        { name: 'elevenlabs-clone/backend/voice-service/requirements.txt', content: 'torch==2.0.0\nfastapi==0.115.0' },
        { name: 'elevenlabs-clone/backend/voice-service/src/models.py', content: 'class VoiceModel:\n    def __init__(self):\n        pass' },
        { name: 'elevenlabs-clone/backend/voice-service/src/generator.py', content: 'async def generate_voice(text, voice_id):\n    pass' },
        { name: 'elevenlabs-clone/backend/voice-service/src/processor.py', content: 'def process_audio(audio_data):\n    pass' },
        { name: 'elevenlabs-clone/backend/auth-service/package.json', content: '{"name":"auth-service"}' },
        { name: 'elevenlabs-clone/backend/auth-service/src/user_model.js', content: 'export const User = {}' },
        { name: 'elevenlabs-clone/backend/storage-service/package.json', content: '{"name":"storage-service"}' },
        { name: 'elevenlabs-clone/backend/storage-service/src/s3_client.js', content: 'export class S3Client {}' },
        { name: 'elevenlabs-clone/frontend/package.json', content: '{"name":"elevenlabs-frontend"}' },
        { name: 'elevenlabs-clone/frontend/components/VoiceGenerator.tsx', content: 'export const VoiceGenerator = () => {\n    return <div>Voice Generator</div>\n}' },
        { name: 'elevenlabs-clone/infra/docker/Dockerfile.voice-service', content: 'FROM python:3.9-slim' },
        { name: 'elevenlabs-clone/infra/k8s/voice-service.yaml', content: 'apiVersion: apps/v1' },
      ];
    } else if (title.includes('chatgpt')) {
      return [
        { name: 'chatgpt-clone/README.md', content: '# ChatGPT Clone – Conversational AI Platform\n\n...\n' },
        { name: 'chatgpt-clone/backend/chat-service/requirements.txt', content: 'openai==1.44.0\nfastapi==0.115.0' },
        { name: 'chatgpt-clone/backend/chat-service/src/chat_manager.py', content: 'class ChatManager:\n    def __init__(self):\n        pass' },
        { name: 'chatgpt-clone/backend/chat-service/src/conversation.py', content: 'class Conversation:\n    def __init__(self):\n        pass' },
        { name: 'chatgpt-clone/backend/chat-service/src/streaming.py', content: 'async def stream_response(response):\n    pass' },
        { name: 'chatgpt-clone/backend/auth-service/package.json', content: '{"name":"auth-service"}' },
        { name: 'chatgpt-clone/backend/auth-service/src/user_model.js', content: 'export const User = {}' },
        { name: 'chatgpt-clone/backend/history-service/package.json', content: '{"name":"history-service"}' },
        { name: 'chatgpt-clone/backend/history-service/src/conversation_store.js', content: 'export class ConversationStore {}' },
        { name: 'chatgpt-clone/frontend/package.json', content: '{"name":"chatgpt-frontend"}' },
        { name: 'chatgpt-clone/frontend/components/Chat.tsx', content: 'export const Chat = () => {\n    return <div>Chat Interface</div>\n}' },
        { name: 'chatgpt-clone/infra/docker/Dockerfile.chat-service', content: 'FROM python:3.9-slim' },
        { name: 'chatgpt-clone/infra/k8s/chat-service.yaml', content: 'apiVersion: apps/v1' },
      ];
    }

    return [];
  };

  // Build nested tree structure from paths
  type Node = { name: string; path: string; type: 'dir' | 'file'; children?: Node[] };
  const files = buildFilesForQuestion(question);
  function buildTree(paths: { name: string; content: string }[]): { root: Node; contents: Record<string, string> } {
    const root: Node = { name: '/', path: '', type: 'dir', children: [] };
    const contents: Record<string, string> = {};
    for (const f of paths) {
      const parts = f.name.split('/');
      let curr = root;
      let currPath = '';
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        currPath = currPath ? currPath + '/' + part : part;
        const isFile = i === parts.length - 1 && part.includes('.');
        if (isFile) {
          contents[currPath] = f.content;
          (curr.children as Node[]).push({ name: part, path: currPath, type: 'file' });
        } else {
          let next = (curr.children as Node[]).find((c) => c.name === part && c.type === 'dir');
          if (!next) {
            next = { name: part, path: currPath, type: 'dir', children: [] };
            (curr.children as Node[]).push(next);
          }
          curr = next;
        }
      }
    }
    // sort children: dirs first then files
    function sortNode(n: Node) {
      if (!n.children) return;
      n.children.sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === 'dir' ? -1 : 1));
      n.children.forEach(sortNode);
    }
    sortNode(root);
    return { root, contents };
  }

  const { root, contents } = buildTree(files);

  const [selected, setSelected] = useState<string>(() => Object.keys(contents)[0]);
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (p: string) => setExpanded((e) => ({ ...e, [p]: !e[p] }));

  const flatFiltered = Object.keys(contents)
    .filter((p) => p.toLowerCase().includes(query.toLowerCase()))
    .sort();

  const activePath = query ? flatFiltered[0] || selected : selected;
  const activeContent = contents[activePath] || '';

  const iconFor = (name: string) => {
    if (name.endsWith('.md')) return <FileText className="h-4 w-4" />;
    if (name.endsWith('.ts') || name.endsWith('.tsx')) return <FileCode className="h-4 w-4" />;
    if (name.endsWith('.py')) return <FileIcon className="h-4 w-4" />;
    if (name.endsWith('.json')) return <FileIcon className="h-4 w-4" />;
    return <FileIcon className="h-4 w-4" />;
  };

  const Tree: React.FC<{ node: Node; depth?: number }> = ({ node, depth = 0 }) => {
    if (node.type === 'file') {
      return (
        <button
          onClick={() => setSelected(node.path)}
          className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded text-sm ${
            node.path === activePath ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
          }`}
          style={{ paddingLeft: 8 + depth * 12 }}
        >
          {iconFor(node.name)}
          <span className="truncate">{node.name}</span>
        </button>
      );
    }
    const isOpen = expanded[node.path] ?? depth < 2; // open first levels by default
    return (
      <div>
        <button
          onClick={() => toggle(node.path)}
          className="w-full flex items-center space-x-2 px-2 py-1.5 rounded text-sm hover:bg-gray-100"
          style={{ paddingLeft: 8 + depth * 12 }}
        >
          <Folder className="h-4 w-4" />
          <span className="truncate font-medium text-gray-800">{node.name}</span>
        </button>
        {isOpen && node.children && (
          <div>
            {node.children.map((c) => (
              <Tree key={c.path} node={c} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Repo header */}
      <div className="px-4 py-3 bg-white border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <Folder className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">{name || 'repo'}</div>
                                    <div className="text-xs text-gray-500">contextual LLD files</div>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1"><Star className="h-4 w-4" /><span>1,248</span></div>
          <div className="flex items-center space-x-1"><GitBranch className="h-4 w-4" /><span>main</span></div>
          <button onClick={() => setDark(!dark)} className="flex items-center space-x-1 px-2 py-1 rounded border hover:bg-gray-50">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span>{dark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Left: nested tree or search results */}
        <div className="w-72 border-r bg-gray-50">
          <div className="p-2 border-b">
            <div className="relative">
              <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search files..."
                className="w-full pl-8 pr-3 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="p-2 space-y-1">
            {query ? (
              flatFiltered.length ? (
                flatFiltered.map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelected(p)}
                    className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded text-sm ${
                      p === activePath ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    {iconFor(p)}
                    <span className="truncate">{p}</span>
                  </button>
                ))
              ) : (
                <div className="text-xs text-gray-500 px-2 py-4">No files match your search.</div>
              )
            ) : (
              <div className="pb-2">
                {root.children?.map((c) => (
                  <Tree key={c.path} node={c} depth={0} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: code viewer */}
        <div className="flex-1">
          <div className="flex items-center justify-between px-3 py-2 border-b bg-white">
            <div className="text-sm font-mono text-gray-700 truncate">{activePath}</div>
            <div className="flex items-center space-x-2">
              <button onClick={() => navigator.clipboard.writeText(activeContent)} className="flex items-center space-x-1 text-sm px-2 py-1 rounded border hover:bg-gray-50">
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </button>
            </div>
          </div>
          <div className={dark ? 'bg-gray-900' : 'bg-gray-50'}>
            <div className="grid grid-cols-[auto,1fr]">
              <pre className={`select-none ${dark ? 'text-gray-400' : 'text-gray-500'} p-4 pr-2 text-xs md:text-sm text-right`}>{activeContent.split('\n').map((_, i) => String(i + 1)).join('\n')}</pre>
              <pre className={`${dark ? 'text-gray-100' : 'text-gray-800'} p-4 overflow-x-auto whitespace-pre-wrap text-xs md:text-sm`}>{activeContent}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuestionDetailProps {
  question: Question;
  onBack: () => void;
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({ question, onBack }) => {
  const [activeTab, setActiveTab] = useState(question.title.includes('Multimodal Pretraining') || question.title.includes('Concurrency and Coroutines') ? 'lld' : 'hld');

  // Track question view when component mounts
  useEffect(() => {
    ViewTracker.trackQuestionView(question.id);
  }, [question.id]);

  const tabs = question.title.includes('Multimodal Pretraining') || question.title.includes('Concurrency and Coroutines')
    ? [
        { id: 'lld', label: 'Q&A', icon: FileText },
      ]
    : [
        { id: 'hld', label: 'HLD', icon: Eye },
        { id: 'lld', label: 'LLD', icon: Code },
      ];

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Hard: 'bg-red-100 text-red-800 border-red-200',
    Expert: 'bg-purple-100 text-purple-800 border-purple-200',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                <span>Trending interview questions</span>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>System Design</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
            {question.logo && (
              <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-xl ring-4 ring-white/10 shadow-md overflow-hidden bg-white flex items-center justify-center self-start sm:self-auto">
                <img src={question.logo} alt="logo" className="h-full w-full object-cover" />
              </div>
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{question.title}</h1>
              <p className="text-slate-300 mt-2 max-w-3xl text-sm sm:text-base">{question.description}</p>
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-slate-300 text-sm">
                <span className={`px-2 py-0.5 rounded-full border border-white/10 bg-white/10 w-fit`}>{question.difficulty}</span>
                <span className="flex items-center space-x-1"><Eye className="h-4 w-4" /><span>{question.views.toLocaleString()} views</span></span>
                <span className="flex items-center space-x-1"><Clock className="h-4 w-4" /><span>Updated {question.timeAgo}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {/* Tabs */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 sm:p-6">
              {activeTab === 'hld' && (
                <div className="space-y-8 sm:space-y-12">
                  {/* System Architecture Overview */}
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <Server className="h-5 w-5 text-white" />
                      </div>
                      {question.title.includes('Perplexity') && 'Perplexity - AI Search Engine Architecture'}
                      {question.title.includes('ElevenLabs') && 'ElevenLabs - AI Voice Generation Architecture'}
                      {question.title.includes('ChatGPT') && 'ChatGPT - Conversational AI Architecture'}

                    </h2>
                    
                    {/* Interview-Focused Goal Statement */}
                    {question.title.includes('Perplexity') && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 mb-8">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Target className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">🎯 Perplexity Goal: Fast, Cited Answers</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-700">Cold Start (p95):</span>
                                  <span className="text-red-600 font-bold">≤ 2.5s</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-700">Hot Cache (p95):</span>
                                  <span className="text-green-600 font-bold">≤ 700ms</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-700">Faithfulness:</span>
                                  <span className="text-purple-600 font-bold">100% Cited</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-700">Availability:</span>
                                  <span className="text-blue-600 font-bold">99.9%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {question.title.includes('ElevenLabs') && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 mb-8">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Target className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">🎯 ElevenLabs Goal: Natural Voice Generation</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-700">Generation Time (p95):</span>
                                  <span className="text-red-600 font-bold">≤ 3.0s</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-700">Voice Quality:</span>
                                  <span className="text-green-600 font-bold">Natural & Realistic</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-700">Languages:</span>
                                  <span className="text-purple-600 font-bold">30+ Supported</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-700">Concurrent Users:</span>
                                  <span className="text-blue-600 font-bold">10K+</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {question.title.includes('ChatGPT') && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 mb-8">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Target className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">🎯 ChatGPT Goal: Seamless Conversations</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-700">Response Time (p95):</span>
                                  <span className="text-red-600 font-bold">≤ 2.0s</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-700">Concurrent Sessions:</span>
                                  <span className="text-green-600 font-bold">1M+</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-700">Context Window:</span>
                                  <span className="text-purple-600 font-bold">128K tokens</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-700">Availability:</span>
                                  <span className="text-blue-600 font-bold">99.9%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}



                    {question.title.includes('Perplexity') && (
                      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-8 border border-blue-100">
                        <div className="grid lg:grid-cols-3 gap-8">
                          <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <svg viewBox="0 0 900 500" className="w-full h-auto">
                              <defs>
                                <linearGradient id="clientGrad" x1="0" y1="0" x2="1" y2="1">
                                  <stop offset="0%" stopColor="#3b82f6" />
                                  <stop offset="100%" stopColor="#1d4ed8" />
                                </linearGradient>
                                <linearGradient id="gatewayGrad" x1="0" y1="0" x2="1" y2="1">
                                  <stop offset="0%" stopColor="#10b981" />
                                  <stop offset="100%" stopColor="#059669" />
                                </linearGradient>
                                <linearGradient id="orchestratorGrad" x1="0" y1="0" x2="1" y2="1">
                                  <stop offset="0%" stopColor="#8b5cf6" />
                                  <stop offset="100%" stopColor="#7c3aed" />
                                </linearGradient>
                                <linearGradient id="retrievalGrad" x1="0" y1="0" x2="1" y2="1">
                                  <stop offset="0%" stopColor="#f59e0b" />
                                  <stop offset="100%" stopColor="#d97706" />
                                </linearGradient>
                                <linearGradient id="llmGrad" x1="0" y1="0" x2="1" y2="1">
                                  <stop offset="0%" stopColor="#ef4444" />
                                  <stop offset="100%" stopColor="#dc2626" />
                                </linearGradient>
                                <linearGradient id="cacheGrad" x1="0" y1="0" x2="1" y2="1">
                                  <stop offset="0%" stopColor="#06b6d4" />
                                  <stop offset="100%" stopColor="#0891b2" />
                                </linearGradient>
                              </defs>
                              
                              {/* Client Layer */}
                              <rect x="50" y="30" width="120" height="60" rx="12" fill="url(#clientGrad)" />
                              <text x="110" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Client</text>
                              <text x="110" y="70" textAnchor="middle" fill="white" fontSize="10">Web/CLI/Mobile</text>

                              {/* API Gateway */}
                              <rect x="220" y="30" width="160" height="60" rx="12" fill="url(#gatewayGrad)" />
                              <text x="300" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">API Gateway / Edge</text>
                              <text x="300" y="65" textAnchor="middle" fill="white" fontSize="9">TLS • Auth • Rate Limits • CDN</text>

                              {/* Query Orchestrator */}
                              <rect x="430" y="30" width="180" height="60" rx="12" fill="url(#orchestratorGrad)" />
                              <text x="520" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Query Orchestrator</text>
                              <text x="520" y="65" textAnchor="middle" fill="white" fontSize="9">Intent Classification • Tool Planning</text>

                              {/* Retrieval Layer - Multi-Index */}
                              <rect x="50" y="140" width="140" height="50" rx="8" fill="url(#retrievalGrad)" />
                              <text x="120" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">News Index</text>
                              <text x="120" y="175" textAnchor="middle" fill="white" fontSize="8">Fresh Content</text>

                              <rect x="210" y="140" width="140" height="50" rx="8" fill="url(#retrievalGrad)" />
                              <text x="280" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Web Index</text>
                              <text x="280" y="175" textAnchor="middle" fill="white" fontSize="8">Evergreen Content</text>

                              <rect x="370" y="140" width="140" height="50" rx="8" fill="url(#retrievalGrad)" />
                              <text x="440" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Papers Index</text>
                              <text x="440" y="175" textAnchor="middle" fill="white" fontSize="8">Research Content</text>

                              <rect x="530" y="140" width="140" height="50" rx="8" fill="url(#retrievalGrad)" />
                              <text x="600" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Code Index</text>
                              <text x="600" y="175" textAnchor="middle" fill="white" fontSize="8">Dev Documentation</text>

                              {/* Document Processor */}
                              <rect x="50" y="220" width="160" height="50" rx="8" fill="url(#cacheGrad)" />
                              <text x="130" y="240" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Document Processor</text>
                              <text x="130" y="255" textAnchor="middle" fill="white" fontSize="8">Crawler → Cleaner → Chunker</text>

                              {/* LLM Synthesis */}
                              <rect x="240" y="220" width="160" height="50" rx="8" fill="url(#llmGrad)" />
                              <text x="320" y="240" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">LLM Synthesis</text>
                              <text x="320" y="255" textAnchor="middle" fill="white" fontSize="8">Draft → Refine → Stream</text>

                              {/* Verifier & Safety */}
                              <rect x="430" y="220" width="160" height="50" rx="8" fill="url(#gatewayGrad)" />
                              <text x="510" y="240" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Verifier & Safety</text>
                              <text x="510" y="255" textAnchor="middle" fill="white" fontSize="8">Claim Matching • NLI • Filters</text>

                              {/* Storage Layer */}
                              <rect x="50" y="320" width="120" height="40" rx="6" fill="#6b7280" />
                              <text x="110" y="340" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Postgres</text>
                              <text x="110" y="350" textAnchor="middle" fill="white" fontSize="8">Metadata</text>

                              <rect x="190" y="320" width="120" height="40" rx="6" fill="#6b7280" />
                              <text x="250" y="340" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">S3</text>
                              <text x="250" y="350" textAnchor="middle" fill="white" fontSize="8">Raw Pages</text>

                              <rect x="330" y="320" width="120" height="40" rx="6" fill="#6b7280" />
                              <text x="390" y="340" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Vector DB</text>
                              <text x="390" y="350" textAnchor="middle" fill="white" fontSize="8">pgvector/FAISS</text>

                              <rect x="470" y="320" width="120" height="40" rx="6" fill="#6b7280" />
                              <text x="530" y="340" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Elasticsearch</text>
                              <text x="530" y="350" textAnchor="middle" fill="white" fontSize="8">BM25 Search</text>

                              <rect x="610" y="320" width="120" height="40" rx="6" fill="url(#cacheGrad)" />
                              <text x="670" y="340" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Redis Cache</text>
                              <text x="670" y="350" textAnchor="middle" fill="white" fontSize="8">Query & Chunks</text>

                              {/* Worker Fleet */}
                              <rect x="50" y="400" width="160" height="40" rx="6" fill="#8b5cf6" />
                              <text x="130" y="420" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Worker Fleet</text>
                              <text x="130" y="430" textAnchor="middle" fill="white" fontSize="8">Ingestion • Embedding</text>

                              {/* Observability */}
                              <rect x="240" y="400" width="160" height="40" rx="6" fill="#10b981" />
                              <text x="320" y="420" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Observability</text>
                              <text x="320" y="430" textAnchor="middle" fill="white" fontSize="8">Metrics • Tracing • Logs</text>

                              {/* Connection Lines */}
                              <line x1="170" y1="60" x2="220" y2="60" stroke="#6b7280" strokeWidth="3" markerEnd="url(#arrowhead)" />
                              <line x1="380" y1="60" x2="430" y2="60" stroke="#6b7280" strokeWidth="3" markerEnd="url(#arrowhead)" />
                              <line x1="520" y1="90" x2="120" y2="140" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                              <line x1="520" y1="90" x2="280" y2="140" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                              <line x1="520" y1="90" x2="440" y2="140" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                              <line x1="520" y1="90" x2="600" y2="140" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                              <line x1="130" y1="190" x2="320" y2="220" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                              <line x1="320" y1="270" x2="510" y2="220" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                              <line x1="130" y1="270" x2="110" y2="320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                              <line x1="130" y1="270" x2="250" y2="320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                              <line x1="130" y1="270" x2="390" y2="320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                              <line x1="130" y1="270" x2="530" y2="320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                              <line x1="130" y1="270" x2="670" y2="320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />

                              {/* Arrow marker */}
                              <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                  <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                                </marker>
                              </defs>
                            </svg>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Server className="h-4 w-4 text-blue-600 mr-2" />
                              Primary Components
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">Client</p>
                                  <p className="text-gray-600">Web/CLI/Mobile with streaming UI</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">API Gateway</p>
                                  <p className="text-gray-600">TLS, auth, rate limits, CDN</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">Query Orchestrator</p>
                                  <p className="text-gray-600">Intent classification & tool planning</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">Retrieval Layer</p>
                                  <p className="text-gray-600">Multi-index (news, web, papers, code)</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">LLM Synthesis</p>
                                  <p className="text-gray-600">Draft → refine → stream tokens</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Database className="h-4 w-4 text-green-600 mr-2" />
                              Storage Stack
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Primary DB:</span>
                                <span className="font-medium">PostgreSQL</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Object Store:</span>
                                <span className="font-medium">S3</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Vector DB:</span>
                                <span className="font-medium">pgvector/FAISS</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Search Engine:</span>
                                <span className="font-medium">Elasticsearch</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Cache:</span>
                                <span className="font-medium">Redis</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    )}
                  </section>
                  {question.title.includes('ChatGPT') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                          <MessageSquare className="h-5 w-5 text-white" />
                        </div>
                        ChatGPT Architecture - Conversational AI Platform
                      </h2>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
                        <div className="grid lg:grid-cols-3 gap-8">
                          <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <svg viewBox="0 0 900 500" className="w-full h-auto">
                                <defs>
                                  <linearGradient id="chatClientGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#10b981" />
                                    <stop offset="100%" stopColor="#059669" />
                                  </linearGradient>
                                  <linearGradient id="chatGatewayGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#1d4ed8" />
                                  </linearGradient>
                                  <linearGradient id="chatManagerGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#7c3aed" />
                                  </linearGradient>
                                  <linearGradient id="chatLLMGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#ef4444" />
                                    <stop offset="100%" stopColor="#dc2626" />
                                  </linearGradient>
                                  <linearGradient id="chatMemoryGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#f59e0b" />
                                    <stop offset="100%" stopColor="#d97706" />
                                  </linearGradient>
                                  <linearGradient id="chatStreamGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#06b6d4" />
                                    <stop offset="100%" stopColor="#0891b2" />
                                  </linearGradient>
                                </defs>
                                
                                {/* Chat Client */}
                                <rect x="50" y="30" width="120" height="60" rx="12" fill="url(#chatClientGrad)" />
                                <text x="110" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Chat Client</text>
                                <text x="110" y="65" textAnchor="middle" fill="white" fontSize="10">Web/Mobile/CLI</text>

                                {/* API Gateway */}
                                <rect x="220" y="30" width="160" height="60" rx="12" fill="url(#chatGatewayGrad)" />
                                <text x="300" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">API Gateway</text>
                                <text x="300" y="65" textAnchor="middle" fill="white" fontSize="9">Auth • Rate Limit • WebSocket</text>

                                {/* Conversation Manager */}
                                <rect x="430" y="30" width="180" height="60" rx="12" fill="url(#chatManagerGrad)" />
                                <text x="520" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Conversation Manager</text>
                                <text x="520" y="65" textAnchor="middle" fill="white" fontSize="9">Thread Management • Context</text>

                                {/* LLM Service */}
                                <rect x="50" y="140" width="160" height="50" rx="8" fill="url(#chatLLMGrad)" />
                                <text x="130" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">LLM Service</text>
                                <text x="130" y="175" textAnchor="middle" fill="white" fontSize="8">GPT-4 • GPT-3.5 • Code Models</text>

                                {/* Memory System */}
                                <rect x="240" y="140" width="160" height="50" rx="8" fill="url(#chatMemoryGrad)" />
                                <text x="320" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Memory System</text>
                                <text x="320" y="175" textAnchor="middle" fill="white" fontSize="8">Context • History • Knowledge</text>

                                {/* Streaming Service */}
                                <rect x="430" y="140" width="160" height="50" rx="8" fill="url(#chatStreamGrad)" />
                                <text x="510" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Streaming Service</text>
                                <text x="510" y="175" textAnchor="middle" fill="white" fontSize="8">Real-time Tokens • WebSocket</text>

                                {/* Plugin System */}
                                <rect x="50" y="220" width="160" height="50" rx="8" fill="url(#chatManagerGrad)" />
                                <text x="130" y="240" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Plugin System</text>
                                <text x="130" y="255" textAnchor="middle" fill="white" fontSize="8">Tools • Functions • APIs</text>

                                {/* Storage Layer */}
                                <rect x="50" y="320" width="120" height="40" rx="6" fill="#6b7280" />
                                <text x="110" y="340" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">PostgreSQL</text>
                                <text x="110" y="350" textAnchor="middle" fill="white" fontSize="8">Conversations</text>

                                <rect x="190" y="320" width="120" height="40" rx="6" fill="#6b7280" />
                                <text x="250" y="340" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Vector DB</text>
                                <text x="250" y="350" textAnchor="middle" fill="white" fontSize="8">Embeddings</text>

                                <rect x="330" y="320" width="120" height="40" rx="6" fill="#6b7280" />
                                <text x="390" y="340" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Redis Cache</text>
                                <text x="390" y="350" textAnchor="middle" fill="white" fontSize="8">Session Data</text>

                                <rect x="470" y="320" width="120" height="40" rx="6" fill="#6b7280" />
                                <text x="530" y="340" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Object Storage</text>
                                <text x="530" y="350" textAnchor="middle" fill="white" fontSize="8">Files & Media</text>

                                {/* Connection Lines */}
                                <line x1="170" y1="60" x2="220" y2="60" stroke="#6b7280" strokeWidth="3" markerEnd="url(#arrowhead)" />
                                <line x1="380" y1="60" x2="430" y2="60" stroke="#6b7280" strokeWidth="3" markerEnd="url(#arrowhead)" />
                                <line x1="520" y1="90" x2="130" y2="140" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                <line x1="520" y1="90" x2="320" y2="140" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                <line x1="520" y1="90" x2="510" y2="140" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                <line x1="130" y1="190" x2="130" y2="220" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                <line x1="130" y1="270" x2="110" y2="320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                <line x1="320" y1="190" x2="390" y2="320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                <line x1="510" y1="190" x2="530" y2="320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />

                                {/* Arrow marker */}
                                <defs>
                                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                                  </marker>
                                </defs>
                              </svg>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <MessageSquare className="h-4 w-4 text-green-600 mr-2" />
                                Chat Components
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                  <div>
                                    <p className="font-medium text-gray-900">Chat Interface</p>
                                    <p className="text-gray-600">Real-time messaging, markdown, code highlighting</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                  <div>
                                    <p className="font-medium text-gray-900">Conversation Manager</p>
                                    <p className="text-gray-600">Thread management, context preservation</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                  <div>
                                    <p className="font-medium text-gray-900">LLM Orchestrator</p>
                                    <p className="text-gray-600">Model selection, prompt engineering</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                                  <div>
                                    <p className="font-medium text-gray-900">Memory System</p>
                                    <p className="text-gray-600">Context, history, knowledge retrieval</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                  <div>
                                    <p className="font-medium text-gray-900">Streaming Service</p>
                                    <p className="text-gray-600">Real-time token streaming</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                   {question.title.includes('ElevenLabs') && (
                     <section>
                       <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                         <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                           <MessageSquare className="h-5 w-5 text-white" />
                         </div>
                         ElevenLabs Architecture - AI Voice Generation Platform
                       </h2>
                       <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100">
                         <div className="grid lg:grid-cols-3 gap-8">
                           <div className="lg:col-span-2">
                             <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                               <svg viewBox="0 0 900 500" className="w-full h-auto">
                                 <defs>
                                   <linearGradient id="voiceClientGrad" x1="0" y1="0" x2="1" y2="1">
                                     <stop offset="0%" stopColor="#8b5cf6" />
                                     <stop offset="100%" stopColor="#7c3aed" />
                                   </linearGradient>
                                   <linearGradient id="voiceGatewayGrad" x1="0" y1="0" x2="1" y2="1">
                                     <stop offset="0%" stopColor="#ec4899" />
                                     <stop offset="100%" stopColor="#db2777" />
                                   </linearGradient>
                                   <linearGradient id="voiceEngineGrad" x1="0" y1="0" x2="1" y2="1">
                                     <stop offset="0%" stopColor="#ef4444" />
                                     <stop offset="100%" stopColor="#dc2626" />
                                   </linearGradient>
                                   <linearGradient id="voiceModelGrad" x1="0" y1="0" x2="1" y2="1">
                                     <stop offset="0%" stopColor="#f59e0b" />
                                     <stop offset="100%" stopColor="#d97706" />
                                   </linearGradient>
                                   <linearGradient id="voiceProcessGrad" x1="0" y1="0" x2="1" y2="1">
                                     <stop offset="0%" stopColor="#06b6d4" />
                                     <stop offset="100%" stopColor="#0891b2" />
                                   </linearGradient>
                                   <linearGradient id="voiceLibraryGrad" x1="0" y1="0" x2="1" y2="1">
                                     <stop offset="0%" stopColor="#10b981" />
                                     <stop offset="100%" stopColor="#059669" />
                                   </linearGradient>
                                 </defs>
                                 
                                 {/* Voice Studio */}
                                 <rect x="50" y="30" width="120" height="60" rx="12" fill="url(#voiceClientGrad)" />
                                 <text x="110" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Voice Studio</text>
                                 <text x="110" y="65" textAnchor="middle" fill="white" fontSize="10">Text Input • Voice Select</text>

                                 {/* API Gateway */}
                                 <rect x="220" y="30" width="160" height="60" rx="12" fill="url(#voiceGatewayGrad)" />
                                 <text x="300" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">API Gateway</text>
                                 <text x="300" y="65" textAnchor="middle" fill="white" fontSize="9">Auth • Rate Limit • Streaming</text>

                                 {/* Voice Generation Engine */}
                                 <rect x="430" y="30" width="180" height="60" rx="12" fill="url(#voiceEngineGrad)" />
                                 <text x="520" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Voice Generation Engine</text>
                                 <text x="520" y="65" textAnchor="middle" fill="white" fontSize="9">Neural TTS • Voice Cloning</text>

                                 {/* Voice Models */}
                                 <rect x="50" y="140" width="160" height="50" rx="8" fill="url(#voiceModelGrad)" />
                                 <text x="130" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Voice Models</text>
                                 <text x="130" y="175" textAnchor="middle" fill="white" fontSize="8">Pre-trained • Custom • Cloned</text>

                                 {/* Audio Processing */}
                                 <rect x="240" y="140" width="160" height="50" rx="8" fill="url(#voiceProcessGrad)" />
                                 <text x="320" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Audio Processing</text>
                                 <text x="320" y="175" textAnchor="middle" fill="white" fontSize="8">Enhancement • Format • Quality</text>

                                 {/* Voice Library */}
                                 <rect x="430" y="140" width="160" height="50" rx="8" fill="url(#voiceLibraryGrad)" />
                                 <text x="510" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Voice Library</text>
                                 <text x="510" y="175" textAnchor="middle" fill="white" fontSize="8">Marketplace • Management</text>

                                 {/* Content Management */}
                                 <rect x="50" y="220" width="160" height="50" rx="8" fill="url(#voiceClientGrad)" />
                                 <text x="130" y="240" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Content Management</text>
                                 <text x="130" y="255" textAnchor="middle" fill="white" fontSize="8">Projects • Collaboration</text>

                                 {/* Storage Layer */}
                                 <rect x="50" y="320" width="120" height="40" rx="6" fill="#6b7280" />
                                 <text x="110" y="340" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">PostgreSQL</text>
                                 <text x="110" y="350" textAnchor="middle" fill="white" fontSize="8">Users • Projects</text>

                                 <rect x="190" y="320" width="120" height="40" rx="6" fill="#6b7280" />
                                 <text x="250" y="340" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">S3/Cloud Storage</text>
                                 <text x="250" y="350" textAnchor="middle" fill="white" fontSize="8">Audio Files • Models</text>

                                 <rect x="330" y="320" width="120" height="40" rx="6" fill="#6b7280" />
                                 <text x="390" y="340" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Redis Cache</text>
                                 <text x="390" y="350" textAnchor="middle" fill="white" fontSize="8">Generated Audio</text>

                                 <rect x="470" y="320" width="120" height="40" rx="6" fill="#6b7280" />
                                 <text x="530" y="340" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">GPU Clusters</text>
                                 <text x="530" y="350" textAnchor="middle" fill="white" fontSize="8">Model Inference</text>

                                 {/* Connection Lines */}
                                 <line x1="170" y1="60" x2="220" y2="60" stroke="#6b7280" strokeWidth="3" markerEnd="url(#arrowhead)" />
                                 <line x1="380" y1="60" x2="430" y2="60" stroke="#6b7280" strokeWidth="3" markerEnd="url(#arrowhead)" />
                                 <line x1="520" y1="90" x2="130" y2="140" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                 <line x1="520" y1="90" x2="320" y2="140" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                 <line x1="520" y1="90" x2="510" y2="140" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                 <line x1="130" y1="190" x2="130" y2="220" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                 <line x1="130" y1="270" x2="110" y2="320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                 <line x1="320" y1="190" x2="390" y2="320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                 <line x1="510" y1="190" x2="530" y2="320" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />

                                 {/* Arrow marker */}
                                 <defs>
                                   <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                     <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                                   </marker>
                                 </defs>
                               </svg>
                             </div>
                           </div>
                           
                           <div className="space-y-4">
                             <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                               <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                                 <MessageSquare className="h-4 w-4 text-purple-600 mr-2" />
                                 Voice Components
                               </h3>
                               <div className="space-y-3 text-sm">
                                 <div className="flex items-start space-x-2">
                                   <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                   <div>
                                     <p className="font-medium text-gray-900">Voice Studio</p>
                                     <p className="text-gray-600">Text input, voice selection, real-time preview</p>
                                   </div>
                                 </div>
                                 <div className="flex items-start space-x-2">
                                   <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                                   <div>
                                     <p className="font-medium text-gray-900">Voice Generation Engine</p>
                                     <p className="text-gray-600">Neural TTS models, voice cloning</p>
                                   </div>
                                 </div>
                                 <div className="flex items-start space-x-2">
                                   <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                   <div>
                                     <p className="font-medium text-gray-900">Audio Processing</p>
                                     <p className="text-gray-600">Noise reduction, enhancement, format conversion</p>
                                   </div>
                                 </div>
                                 <div className="flex items-start space-x-2">
                                   <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                                   <div>
                                     <p className="font-medium text-gray-900">Voice Library</p>
                                     <p className="text-gray-600">Pre-trained voices, custom voice creation</p>
                                   </div>
                                 </div>
                                 <div className="flex items-start space-x-2">
                                   <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                                   <div>
                                     <p className="font-medium text-gray-900">Content Management</p>
                                     <p className="text-gray-600">Project organization, collaboration</p>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </section>
                   )}

                   {question.title.includes('Concurrency and Coroutines') && (
                     <section>
                       <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                         <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                           <FileText className="h-5 w-5 text-white" />
                         </div>
                         Concurrency and Coroutines - Comprehensive Q&A Guide
                       </h2>
                       <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
                         <div className="space-y-8">
                           {/* Q1 */}
                           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q1</span>
                               What is the difference between coroutines and threads?
                             </h3>
                             <div className="bg-gray-50 rounded-lg p-4">
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 <strong>Answer:</strong>
                               </p>
                               <ul className="text-gray-700 leading-relaxed space-y-2">
                                 <li>Coroutines are lightweight and use cooperative multitasking, switching only when they await.</li>
                                 <li>Threads are heavier since each requires its own stack and involve preemptive multitasking, where the OS decides when to switch.</li>
                                 <li>Context switching in threads is expensive, while in coroutines it's controlled manually via await.</li>
                               </ul>
                             </div>
                           </div>

                           {/* Q2 */}
                           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q2</span>
                               What is the Global Interpreter Lock (GIL) and why is it required?
                             </h3>
                             <div className="bg-gray-50 rounded-lg p-4">
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 <strong>Answer:</strong>
                               </p>
                               <ul className="text-gray-700 leading-relaxed space-y-2">
                                 <li>The GIL is a mutex that ensures only one thread executes Python bytecode at a time.</li>
                                 <li>Required because Python uses reference counting for memory management, and updating reference counts isn't thread-safe.</li>
                                 <li>Removing GIL would either risk deadlocks or hurt single-thread performance.</li>
                               </ul>
                             </div>
                           </div>

                           {/* Q3 */}
                           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q3</span>
                               What is the difference between preemptive vs cooperative multitasking?
                             </h3>
                             <div className="bg-gray-50 rounded-lg p-4">
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 <strong>Answer:</strong>
                               </p>
                               <ul className="text-gray-700 leading-relaxed space-y-2">
                                 <li>Preemptive multitasking: OS decides which thread runs, interrupting threads arbitrarily (used in threads).</li>
                                 <li>Cooperative multitasking: Tasks voluntarily yield control (await in asyncio).</li>
                               </ul>
                             </div>
                           </div>

                           {/* Q4 */}
                           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q4</span>
                               What are blocking vs non-blocking functions?
                             </h3>
                             <div className="bg-gray-50 rounded-lg p-4">
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 <strong>Answer:</strong>
                               </p>
                               <ul className="text-gray-700 leading-relaxed space-y-2">
                                 <li>Blocking: Halts execution until the task completes (e.g., <code>time.sleep</code>).</li>
                                 <li>Non-blocking: Yields control while waiting (e.g., <code>await asyncio.sleep</code>).</li>
                                 <li>Non-blocking allows concurrency without waiting.</li>
                               </ul>
                             </div>
                           </div>

                           {/* Q5 */}
                           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q5</span>
                               Why are threading and multiprocessing synchronous while asyncio is asynchronous?
                             </h3>
                             <div className="bg-gray-50 rounded-lg p-4">
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 <strong>Answer:</strong>
                               </p>
                               <ul className="text-gray-700 leading-relaxed space-y-2">
                                 <li>Threading and multiprocessing still wait for blocking calls to complete, so execution can be delayed.</li>
                                 <li>AsyncIO uses an event loop where tasks yield control instead of blocking → allowing true asynchronous execution.</li>
                               </ul>
                             </div>
                           </div>

                           {/* Q6 */}
                           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q6</span>
                               Why is threading prone to race conditions but asyncio less so?
                             </h3>
                             <div className="bg-gray-50 rounded-lg p-4">
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 <strong>Answer:</strong>
                               </p>
                               <ul className="text-gray-700 leading-relaxed space-y-2">
                                 <li>Threading uses multiple threads that may access shared memory simultaneously → race conditions.</li>
                                 <li>Asyncio uses a single thread, so race conditions only occur at explicit await points, making them rarer.</li>
                               </ul>
                             </div>
                           </div>

                           {/* Q7 */}
                           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q7</span>
                               How do you use a ThreadPool in Python?
                             </h3>
                             <div className="bg-gray-50 rounded-lg p-4">
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 <strong>Answer:</strong>
                               </p>
                               <pre className="bg-gray-100 p-3 rounded text-sm mb-3 overflow-x-auto">
{`from multiprocessing.pool import ThreadPool

def fetch(url):
    return requests.get(url).text

urls = ["https://example.com", "https://python.org"]

with ThreadPool(5) as pool:
    results = pool.map(fetch, urls)`}
                               </pre>
                               <p className="text-gray-700 leading-relaxed">
                                 <code>ThreadPool.map()</code> executes the function across threads and collects results.
                               </p>
                             </div>
                           </div>

                           {/* Q8 */}
                           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q8</span>
                               How do you use a Pool in multiprocessing?
                             </h3>
                             <div className="bg-gray-50 rounded-lg p-4">
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 <strong>Answer:</strong>
                               </p>
                               <pre className="bg-gray-100 p-3 rounded text-sm mb-3 overflow-x-auto">
{`from multiprocessing import Pool

def square(n):
    return n * n

with Pool(4) as pool:
    results = pool.map(square, [1, 2, 3, 4, 5])`}
                               </pre>
                               <p className="text-gray-700 leading-relaxed">
                                 Each worker runs in a separate process, enabling parallel execution on multiple CPUs.
                               </p>
                             </div>
                           </div>

                           {/* Q9 */}
                           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q9</span>
                               How does ThreadPoolExecutor differ from ProcessPoolExecutor?
                             </h3>
                             <div className="bg-gray-50 rounded-lg p-4">
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 <strong>Answer:</strong>
                               </p>
                               <ul className="text-gray-700 leading-relaxed space-y-2">
                                 <li>ThreadPoolExecutor: Uses threads, good for I/O-bound tasks.</li>
                                 <li>ProcessPoolExecutor: Uses processes, good for CPU-bound tasks.</li>
                                 <li>Both provide a unified API via <code>executor.map</code>.</li>
                               </ul>
                             </div>
                           </div>

                           {/* Q10 */}
                           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q10</span>
                               What does as_completed do in ThreadPoolExecutor?
                             </h3>
                             <div className="bg-gray-50 rounded-lg p-4">
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 <strong>Answer:</strong>
                               </p>
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 Returns results in the order tasks finish, not in the order they were submitted.
                               </p>
                               <pre className="bg-gray-100 p-3 rounded text-sm mb-3 overflow-x-auto">
{`from concurrent.futures import ThreadPoolExecutor, as_completed

with ThreadPoolExecutor(3) as executor:
    futures = [executor.submit(fetch, url) for url in urls]
    for future in as_completed(futures):
        print(future.result())`}
                               </pre>
                             </div>
                           </div>

                           {/* Q11 */}
                           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q11</span>
                               What are some key asyncio functions?
                             </h3>
                             <div className="bg-gray-50 rounded-lg p-4">
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 <strong>Answer:</strong>
                               </p>
                               <ul className="text-gray-700 leading-relaxed space-y-2">
                                 <li><code>asyncio.run(coro)</code> → runs main coroutine.</li>
                                 <li><code>asyncio.create_task(coro)</code> → schedules coroutine to run.</li>
                                 <li><code>asyncio.gather(*coros)</code> → runs multiple coroutines concurrently.</li>
                                 <li><code>asyncio.as_completed(coros)</code> → yields results as they finish.</li>
                                 <li><code>asyncio.to_thread(fn, *args)</code> → runs a blocking function in a separate thread.</li>
                                 <li><code>asyncio.wait_for(coro, timeout)</code> → adds timeout.</li>
                               </ul>
                             </div>
                           </div>

                           {/* Q12 */}
                           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q12</span>
                               How do you write async code in Python?
                             </h3>
                             <div className="bg-gray-50 rounded-lg p-4">
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 <strong>Answer:</strong>
                               </p>
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 Use <code>async def</code> to define a coroutine, <code>await</code> to yield control, and <code>async with</code> or <code>async for</code> for context managers and loops.
                               </p>
                               <pre className="bg-gray-100 p-3 rounded text-sm mb-3 overflow-x-auto">
{`import asyncio

async def say_hello():
    await asyncio.sleep(1)
    print("Hello")

asyncio.run(say_hello())`}
                               </pre>
                             </div>
                           </div>

                           {/* Q13 */}
                           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q13</span>
                               Why does asyncio use queues (asyncio.Queue)?
                             </h3>
                             <div className="bg-gray-50 rounded-lg p-4">
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 <strong>Answer:</strong>
                               </p>
                               <ul className="text-gray-700 leading-relaxed space-y-2">
                                 <li>Useful for producer-consumer patterns.</li>
                                 <li>Tasks can await <code>q.get()</code> and await <code>q.put(item)</code>.</li>
                                 <li><code>q.join()</code> waits until all items are processed, and <code>consumer.cancel()</code> can stop consumers.</li>
                               </ul>
                             </div>
                           </div>

                           {/* Q14 */}
                           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q14</span>
                               Why do we need asyncio.to_thread?
                             </h3>
                             <div className="bg-gray-50 rounded-lg p-4">
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 <strong>Answer:</strong>
                               </p>
                               <p className="text-gray-700 leading-relaxed">
                                 To offload blocking functions (e.g., file I/O, DB calls) into threads so they don't block the event loop.
                               </p>
                             </div>
                           </div>

                           {/* Q15 */}
                           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q15</span>
                               Why do we still need locks in multiprocessing?
                             </h3>
                             <div className="bg-gray-50 rounded-lg p-4">
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 <strong>Answer:</strong>
                               </p>
                               <ul className="text-gray-700 leading-relaxed space-y-2">
                                 <li>Even though processes don't share memory by default, they can use shared objects (multiprocessing.Value, Array, or Manager).</li>
                                 <li>Locks are required to safely update shared state.</li>
                               </ul>
                             </div>
                           </div>

                           {/* Q16 */}
                           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q16</span>
                               Why can't we use a normal dictionary in multiprocessing instead of Manager().dict()?
                             </h3>
                             <div className="bg-gray-50 rounded-lg p-4">
                               <p className="text-gray-700 leading-relaxed mb-3">
                                 <strong>Answer:</strong>
                               </p>
                               <ul className="text-gray-700 leading-relaxed space-y-2">
                                 <li>Regular dict lives in one process memory space.</li>
                                 <li>Manager().dict() provides a proxy object that enables safe sharing across processes via IPC (inter-process communication).</li>
                               </ul>
                             </div>
                           </div>
                         </div>
                       </div>
                     </section>
                   )}



                   {/* Detailed Component Breakdown */}
                  {question.title.includes('Perplexity') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                          <Network className="h-5 w-5 text-white" />
                        </div>
                        Perplexity Component Breakdown (Interview Focus)
                      </h2>
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-8 border border-green-100">
                      <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                <Server className="h-4 w-4 text-blue-600" />
                              </div>
                              Client Layer
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                                <div>
                                  <p className="font-medium text-gray-900">Web Interface</p>
                                  <p className="text-gray-600">Query box, streaming answer UI, sources panel</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                                <div>
                                  <p className="font-medium text-gray-900">CLI Client</p>
                                  <p className="text-gray-600">Command-line interface for power users</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                                <div>
                                  <p className="font-medium text-gray-900">Mobile App</p>
                                  <p className="text-gray-600">Native mobile experience with offline support</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <Shield className="h-4 w-4 text-green-600" />
                              </div>
                              API Gateway / Edge
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <span className="font-medium text-gray-700">TLS Termination</span>
                                <span className="text-green-600 font-medium">SSL/TLS 1.3</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <span className="font-medium text-gray-700">Authentication</span>
                                <span className="text-green-600 font-medium">JWT + OAuth 2.0</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <span className="font-medium text-gray-700">Rate Limiting</span>
                                <span className="text-green-600 font-medium">Token Bucket Algorithm</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <span className="font-medium text-gray-700">CDN</span>
                                <span className="text-green-600 font-medium">Cloudflare + Edge Caching</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                <Network className="h-4 w-4 text-purple-600" />
                              </div>
                              Query Orchestrator
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                                <div>
                                  <p className="font-medium text-gray-900">Intent Classification</p>
                                  <p className="text-gray-600">Determines query type (factual, analytical, creative)</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                                <div>
                                  <p className="font-medium text-gray-900">Tool Planning</p>
                                  <p className="text-gray-600">Selects which indexes/tools to query</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                                <div>
                                  <p className="font-medium text-gray-900">Query Optimization</p>
                                  <p className="text-gray-600">Parallel execution, timeout management</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                <Database className="h-4 w-4 text-orange-600" />
                              </div>
                              Retrieval Layer (Multi-Index)
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="p-3 bg-orange-50 rounded-lg">
                                <p className="font-medium text-gray-900 mb-2">News Index (Fresh Content)</p>
                                <p className="text-gray-600">Real-time news, social media, trending topics</p>
                                <div className="mt-2 flex space-x-2">
                                  <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded">BM25</span>
                                  <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded">Vector</span>
                                  <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded">Freshness</span>
                                </div>
                              </div>
                              <div className="p-3 bg-orange-50 rounded-lg">
                                <p className="font-medium text-gray-900 mb-2">Web Index (Evergreen)</p>
                                <p className="text-gray-600">Wikipedia, documentation, reference materials</p>
                                <div className="mt-2 flex space-x-2">
                                  <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded">BM25</span>
                                  <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded">Vector</span>
                                  <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded">Authority</span>
                                </div>
                              </div>
                              <div className="p-3 bg-orange-50 rounded-lg">
                                <p className="font-medium text-gray-900 mb-2">Papers Index (Research)</p>
                                <p className="text-gray-600">Academic papers, research publications</p>
                                <div className="mt-2 flex space-x-2">
                                  <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded">BM25</span>
                                  <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded">Vector</span>
                                  <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded">Citations</span>
                                </div>
                              </div>
                              <div className="p-3 bg-orange-50 rounded-lg">
                                <p className="font-medium text-gray-900 mb-2">Code Index (Dev Docs)</p>
                                <p className="text-gray-600">GitHub, Stack Overflow, documentation</p>
                                <div className="mt-2 flex space-x-2">
                                  <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded">BM25</span>
                                  <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded">Vector</span>
                                  <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded">Syntax</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                <Zap className="h-4 w-4 text-red-600" />
                              </div>
                              Processing Pipeline
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                <span className="font-medium text-gray-700">Document Processor</span>
                                <span className="text-red-600 font-medium">Crawler → Cleaner → Chunker</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                <span className="font-medium text-gray-700">LLM Synthesis</span>
                                <span className="text-red-600 font-medium">Draft → Refine → Stream</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                <span className="font-medium text-gray-700">Verifier & Safety</span>
                                <span className="text-red-600 font-medium">Claim Matching • NLI • Filters</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                <span className="font-medium text-gray-700">Worker Fleet</span>
                                <span className="text-red-600 font-medium">Ingestion • Embedding • Training</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  )}

                  {/* Data Flow Diagram */}
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <Network className="h-5 w-5 text-white" />
                      </div>
                      Data Flow & Processing Pipeline
                    </h2>
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-8 border border-green-100">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4">Request Processing Flow</h3>
                            <div className="space-y-4">
                              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                                <div>
                                  <p className="font-medium text-gray-900">Query Reception</p>
                                  <p className="text-sm text-gray-600">User query received via API Gateway</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                                <div>
                                  <p className="font-medium text-gray-900">Query Processing</p>
                                  <p className="text-sm text-gray-600">Language detection & intent classification</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                                <div>
                                  <p className="font-medium text-gray-900">Parallel Search</p>
                                  <p className="text-sm text-gray-600">BM25 + Vector search execution</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                                <div>
                                  <p className="font-medium text-gray-900">Response Generation</p>
                                  <p className="text-sm text-gray-600">LLM synthesis with citations</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                          <h3 className="font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <span className="font-medium text-gray-700">Response Time (p95)</span>
                              <span className="text-green-600 font-bold">~2.5s</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <span className="font-medium text-gray-700">Throughput (QPS)</span>
                              <span className="text-blue-600 font-bold">10,000+</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <span className="font-medium text-gray-700">Accuracy</span>
                              <span className="text-purple-600 font-bold">94.2%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <span className="font-medium text-gray-700">Availability</span>
                              <span className="text-emerald-600 font-bold">99.9%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Scalability & Infrastructure */}
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      Scalability & Infrastructure
                    </h2>
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border border-orange-100">
                      <div className="grid lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                          <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                              <Database className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Database Architecture</h3>
                          </div>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Primary DB</span>
                              <span className="font-medium">PostgreSQL</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Search Engine</span>
                              <span className="font-medium">Elasticsearch</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Vector Store</span>
                              <span className="font-medium">Pinecone</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Cache</span>
                              <span className="font-medium">Redis</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                          <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                              <Network className="h-5 w-5 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Deployment Strategy</h3>
                          </div>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Containerization</span>
                              <span className="font-medium">Docker</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Orchestration</span>
                              <span className="font-medium">Kubernetes</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Load Balancer</span>
                              <span className="font-medium">NGINX</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">CDN</span>
                              <span className="font-medium">Cloudflare</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                          <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                              <Shield className="h-5 w-5 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Security & Monitoring</h3>
                          </div>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Authentication</span>
                              <span className="font-medium">JWT + OAuth</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Rate Limiting</span>
                              <span className="font-medium">Redis-based</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Monitoring</span>
                              <span className="font-medium">Prometheus</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Logging</span>
                              <span className="font-medium">ELK Stack</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Detailed HLD per Question */}
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      Detailed Design Specifications
                    </h2>
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-100">
                      <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center mb-4">
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              </div>
                              <h3 className="font-semibold text-gray-900">Goals & Non-Goals</h3>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">Performance SLAs</p>
                                  <p className="text-sm text-gray-600">p50: 500ms, p95: 2.5s, p99: 5s response times</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">Scalability</p>
                                  <p className="text-sm text-gray-600">Auto-scaling, horizontal scaling, cost optimization</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">Security & Compliance</p>
                                  <p className="text-sm text-gray-600">AuthZ, audit logs, data retention, PII handling</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center mb-4">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                <Database className="h-5 w-5 text-blue-600" />
                              </div>
                              <h3 className="font-semibold text-gray-900">Data & Indexing Strategy</h3>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">Crawling & Ingestion</p>
                                  <p className="text-sm text-gray-600">Incremental crawlers, freshness tracking, deduplication</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">Hybrid Search</p>
                                  <p className="text-sm text-gray-600">BM25 + vector embeddings, domain-specific sharding</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">Quality Signals</p>
                                  <p className="text-sm text-gray-600">Authority scoring, recency, diversity, feedback loops</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center mb-4">
                              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                <Zap className="h-5 w-5 text-orange-600" />
                              </div>
                              <h3 className="font-semibold text-gray-900">Reliability & Scale</h3>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">Graceful Degradation</p>
                                  <p className="text-sm text-gray-600">Cache hits, reduced fanout, fallback responses</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">Load Management</p>
                                  <p className="text-sm text-gray-600">Backpressure, rate limiting, hot shard protection</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">High Availability</p>
                                  <p className="text-sm text-gray-600">Regional redundancy, blue/green deployments</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center mb-4">
                              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                <Shield className="h-5 w-5 text-red-600" />
                              </div>
                              <h3 className="font-semibold text-gray-900">Safety & Compliance</h3>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">Content Safety</p>
                                  <p className="text-sm text-gray-600">Toxicity filters, abuse detection, guardrail prompts</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3 p-3 bg-pink-50 rounded-lg">
                                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">Privacy Protection</p>
                                  <p className="text-sm text-gray-600">PII redaction, jurisdictional boundaries, data retention</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                                <div>
                                  <p className="font-medium text-gray-900">Audit & Compliance</p>
                                  <p className="text-sm text-gray-600">Provenance tracking, citation requirements, audit logs</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  

                  {question.title.includes('ChatGPT') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                          <Network className="h-5 w-5 text-white" />
                        </div>
                        ChatGPT Component Breakdown (Interview Focus)
                      </h2>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                  <MessageSquare className="h-4 w-4 text-green-600" />
                                </div>
                                Chat Interface Layer
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                                  <div>
                                    <p className="font-medium text-gray-900">Real-time Chat UI</p>
                                    <p className="text-gray-600">WebSocket connections, message streaming, markdown rendering</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                                  <div>
                                    <p className="font-medium text-gray-900">Conversation Management</p>
                                    <p className="text-gray-600">Thread persistence, context window management, history</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                                  <div>
                                    <p className="font-medium text-gray-900">Plugin System</p>
                                    <p className="text-gray-600">Tool integration, function calling, external APIs</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                  <Server className="h-4 w-4 text-blue-600" />
                                </div>
                                LLM Orchestration
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                  <span className="font-medium text-gray-700">Model Selection</span>
                                  <span className="text-blue-600 font-medium">GPT-4 • GPT-3.5 • Code Models</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                  <span className="font-medium text-gray-700">Context Management</span>
                                  <span className="text-blue-600 font-medium">128K Token Window</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                  <span className="font-medium text-gray-700">Streaming</span>
                                  <span className="text-blue-600 font-medium">Real-time Token Delivery</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                  <span className="font-medium text-gray-700">Memory System</span>
                                  <span className="text-blue-600 font-medium">Conversation History • Knowledge Base</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                  <Database className="h-4 w-4 text-purple-600" />
                                </div>
                                Storage & Persistence
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="p-3 bg-purple-50 rounded-lg">
                                  <p className="font-medium text-gray-900 mb-2">Conversation Storage</p>
                                  <p className="text-gray-600">PostgreSQL for conversation threads, messages, metadata</p>
                                  <div className="mt-2 flex space-x-2">
                                    <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded">Threads</span>
                                    <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded">Messages</span>
                                    <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded">Metadata</span>
                                  </div>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-lg">
                                  <p className="font-medium text-gray-900 mb-2">Vector Storage</p>
                                  <p className="text-gray-600">Embeddings for semantic search and context retrieval</p>
                                  <div className="mt-2 flex space-x-2">
                                    <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded">Embeddings</span>
                                    <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded">Semantic Search</span>
                                    <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded">Context</span>
                                  </div>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-lg">
                                  <p className="font-medium text-gray-900 mb-2">Session Management</p>
                                  <p className="text-gray-600">Redis for active sessions, rate limiting, caching</p>
                                  <div className="mt-2 flex space-x-2">
                                    <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded">Sessions</span>
                                    <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded">Rate Limits</span>
                                    <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded">Cache</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                  <Zap className="h-4 w-4 text-orange-600" />
                                </div>
                                Performance & Scale
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                  <span className="font-medium text-gray-700">Response Time</span>
                                  <span className="text-orange-600 font-medium">≤ 2.0s (p95)</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                  <span className="font-medium text-gray-700">Concurrent Sessions</span>
                                  <span className="text-orange-600 font-medium">1M+ Active Users</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                  <span className="font-medium text-gray-700">Auto-scaling</span>
                                  <span className="text-orange-600 font-medium">Dynamic Model Allocation</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                  <span className="font-medium text-gray-700">Availability</span>
                                  <span className="text-orange-600 font-medium">99.9% Uptime</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {question.title.includes('ElevenLabs') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                          <Network className="h-5 w-5 text-white" />
                        </div>
                        ElevenLabs Component Breakdown (Interview Focus)
                      </h2>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100">
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                  <MessageSquare className="h-4 w-4 text-purple-600" />
                                </div>
                                Voice Generation Engine
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                                  <div>
                                    <p className="font-medium text-gray-900">Neural TTS Models</p>
                                    <p className="text-gray-600">Transformer-based models, voice cloning, emotion control</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                                  <div>
                                    <p className="font-medium text-gray-900">Voice Library</p>
                                    <p className="text-gray-600">Pre-trained voices, custom voice creation, marketplace</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                                  <div>
                                    <p className="font-medium text-gray-900">Real-time Processing</p>
                                    <p className="text-gray-600">Streaming audio generation, low-latency inference</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                                  <Server className="h-4 w-4 text-pink-600" />
                                </div>
                                Audio Processing Pipeline
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                                  <span className="font-medium text-gray-700">Text Analysis</span>
                                  <span className="text-pink-600 font-medium">Phoneme Conversion • Prosody</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                                  <span className="font-medium text-gray-700">Audio Generation</span>
                                  <span className="text-pink-600 font-medium">Neural Synthesis • Waveform</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                                  <span className="font-medium text-gray-700">Post-processing</span>
                                  <span className="text-pink-600 font-medium">Enhancement • Format Conversion</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                                  <span className="font-medium text-gray-700">Quality Control</span>
                                  <span className="text-pink-600 font-medium">Noise Reduction • Clarity</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                                  <Database className="h-4 w-4 text-cyan-600" />
                                </div>
                                Content & Storage
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="p-3 bg-cyan-50 rounded-lg">
                                  <p className="font-medium text-gray-900 mb-2">Voice Models Storage</p>
                                  <p className="text-gray-600">GPU clusters for model inference, distributed training</p>
                                  <div className="mt-2 flex space-x-2">
                                    <span className="px-2 py-1 bg-cyan-200 text-cyan-800 text-xs rounded">Models</span>
                                    <span className="px-2 py-1 bg-cyan-200 text-cyan-800 text-xs rounded">Weights</span>
                                    <span className="px-2 py-1 bg-cyan-200 text-cyan-800 text-xs rounded">Configs</span>
                                  </div>
                                </div>
                                <div className="p-3 bg-cyan-50 rounded-lg">
                                  <p className="font-medium text-gray-900 mb-2">Audio File Management</p>
                                  <p className="text-gray-600">S3/Cloud storage for generated audio, user uploads</p>
                                  <div className="mt-2 flex space-x-2">
                                    <span className="px-2 py-1 bg-cyan-200 text-cyan-800 text-xs rounded">Generated</span>
                                    <span className="px-2 py-1 bg-cyan-200 text-cyan-800 text-xs rounded">Uploaded</span>
                                    <span className="px-2 py-1 bg-cyan-200 text-cyan-800 text-xs rounded">Cached</span>
                                  </div>
                                </div>
                                <div className="p-3 bg-cyan-50 rounded-lg">
                                  <p className="font-medium text-gray-900 mb-2">Project Management</p>
                                  <p className="text-gray-600">PostgreSQL for user projects, collaboration, metadata</p>
                                  <div className="mt-2 flex space-x-2">
                                    <span className="px-2 py-1 bg-cyan-200 text-cyan-800 text-xs rounded">Projects</span>
                                    <span className="px-2 py-1 bg-cyan-200 text-cyan-800 text-xs rounded">Collaboration</span>
                                    <span className="px-2 py-1 bg-cyan-200 text-cyan-800 text-xs rounded">Metadata</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                  <Zap className="h-4 w-4 text-orange-600" />
                                </div>
                                Performance & Scale
                              </h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                  <span className="font-medium text-gray-700">Generation Time</span>
                                  <span className="text-orange-600 font-medium">≤ 3.0s (p95)</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                  <span className="font-medium text-gray-700">Concurrent Users</span>
                                  <span className="text-orange-600 font-medium">10K+ Active</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                  <span className="font-medium text-gray-700">GPU Utilization</span>
                                  <span className="text-orange-600 font-medium">Dynamic Allocation</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                  <span className="font-medium text-gray-700">Languages</span>
                                  <span className="text-orange-600 font-medium">30+ Supported</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              )}

              {activeTab === 'lld' && (
                <div className="space-y-12">
                  {/* LLD Overview */}
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                        <Code className="h-5 w-5 text-white" />
                      </div>
                      {question.title.includes('Perplexity') && 'Perplexity LLD - Search Engine Implementation'}
                      {question.title.includes('ElevenLabs') && 'ElevenLabs LLD - Voice Generation Implementation'}
                      {question.title.includes('ChatGPT') && 'ChatGPT LLD - Chat Platform Implementation'}

                    </h2>
                    
                    {question.title.includes('Perplexity') && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 mb-8">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileCode className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">🎯 Perplexity Implementation: Search & Answer Platform</h3>
                            <p className="text-gray-700 mb-3">Concrete implementation details for AI-powered search with real-time answers and citations.</p>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div className="bg-white rounded-lg p-3">
                                <span className="font-medium text-blue-700">Search APIs</span>
                                <p className="text-gray-600">Query processing & retrieval</p>
                              </div>
                              <div className="bg-white rounded-lg p-3">
                                <span className="font-medium text-blue-700">Vector Search</span>
                                <p className="text-gray-600">Embeddings & similarity</p>
                              </div>
                              <div className="bg-white rounded-lg p-3">
                                <span className="font-medium text-blue-700">LLM Integration</span>
                                <p className="text-gray-600">Answer generation</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {question.title.includes('ElevenLabs') && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 mb-8">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileCode className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">🎯 ElevenLabs Implementation: AI Voice Generation</h3>
                            <p className="text-gray-700 mb-3">Concrete implementation details for neural TTS with voice cloning and real-time generation.</p>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div className="bg-white rounded-lg p-3">
                                <span className="font-medium text-purple-700">Voice APIs</span>
                                <p className="text-gray-600">Text-to-speech generation</p>
                              </div>
                              <div className="bg-white rounded-lg p-3">
                                <span className="font-medium text-purple-700">Voice Models</span>
                                <p className="text-gray-600">Neural networks & cloning</p>
                              </div>
                              <div className="bg-white rounded-lg p-3">
                                <span className="font-medium text-purple-700">Audio Processing</span>
                                <p className="text-gray-600">Real-time streaming</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {question.title.includes('ChatGPT') && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 mb-8">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileCode className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">🎯 ChatGPT Implementation: Conversational AI Platform</h3>
                            <p className="text-gray-700 mb-3">Concrete implementation details for real-time chat with context memory and streaming responses.</p>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div className="bg-white rounded-lg p-3">
                                <span className="font-medium text-green-700">Chat APIs</span>
                                <p className="text-gray-600">Conversation management</p>
                              </div>
                              <div className="bg-white rounded-lg p-3">
                                <span className="font-medium text-green-700">Streaming</span>
                                <p className="text-gray-600">Real-time responses</p>
                              </div>
                              <div className="bg-white rounded-lg p-3">
                                <span className="font-medium text-green-700">Memory System</span>
                                <p className="text-gray-600">Context preservation</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}


                  </section>

                  {/* Pseudo Code Implementation */}
                  {question.title.includes('Perplexity') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                          <Code className="h-5 w-5 text-white" />
                        </div>
                        Perplexity Pseudo Code Implementation
                      </h2>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                  <SearchIcon className="h-4 w-4 text-blue-600" />
                                </div>
                                Search Query Processing
                              </h3>
                              <pre className="text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`class SearchQueryProcessor:
    def process_query(self, query: str, user_id: str):
        # 1. Query preprocessing
        cleaned_query = self.preprocess_query(query)
        
        # 2. Intent classification
        intent = self.classify_intent(cleaned_query)
        
        # 3. Tool planning
        tools_needed = self.plan_tools(intent)
        
        # 4. Multi-index search
        results = {}
        for tool in tools_needed:
            if tool == "web_search":
                results["web"] = self.search_web_index(cleaned_query)
            elif tool == "news_search":
                results["news"] = self.search_news_index(cleaned_query)
            elif tool == "papers_search":
                results["papers"] = self.search_papers_index(cleaned_query)
        
        # 5. Result ranking and merging
        merged_results = self.merge_and_rank_results(results)
        
        return merged_results

    def preprocess_query(self, query: str):
        # Remove special characters, normalize
        return query.lower().strip()
    
    def classify_intent(self, query: str):
        # Use ML model to classify search intent
        return self.intent_model.predict(query)
    
    def plan_tools(self, intent: str):
        # Determine which search tools to use
        tool_mapping = {
            "news": ["news_search"],
            "academic": ["papers_search", "web_search"],
            "general": ["web_search", "news_search"]
        }
        return tool_mapping.get(intent, ["web_search"])`}
                              </pre>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                  <Database className="h-4 w-4 text-green-600" />
                                </div>
                                Hybrid Search Implementation
                              </h3>
                              <pre className="text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`class HybridSearchEngine:
    def __init__(self):
        self.bm25_index = BM25Index()
        self.vector_index = VectorIndex()
        self.ranker = NeuralRanker()
    
    def search(self, query: str, index_type: str):
        # 1. BM25 sparse search
        bm25_results = self.bm25_index.search(query, limit=100)
        
        # 2. Vector dense search
        query_embedding = self.embed_query(query)
        vector_results = self.vector_index.search(query_embedding, limit=100)
        
        # 3. Result fusion
        fused_results = self.fuse_results(bm25_results, vector_results)
        
        # 4. Neural re-ranking
        final_results = self.ranker.rerank(query, fused_results[:20])
        
        return final_results
    
    def fuse_results(self, bm25_results, vector_results):
        # Reciprocal rank fusion
        fused_scores = {}
        
        for i, doc in enumerate(bm25_results):
            fused_scores[doc.id] = fused_scores.get(doc.id, 0) + 1/(i + 1)
        
        for i, doc in enumerate(vector_results):
            fused_scores[doc.id] = fused_scores.get(doc.id, 0) + 1/(i + 1)
        
        # Sort by fused scores
        return sorted(fused_scores.items(), key=lambda x: x[1], reverse=True)`}
                              </pre>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                  <MessageSquare className="h-4 w-4 text-purple-600" />
                                </div>
                                Answer Synthesis
                              </h3>
                              <pre className="text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`class AnswerSynthesizer:
    def __init__(self):
        self.llm_client = LLMClient()
        self.citation_extractor = CitationExtractor()
    
    def synthesize_answer(self, query: str, search_results: List[Document]):
        # 1. Extract relevant passages
        passages = self.extract_passages(search_results)
        
        # 2. Generate initial draft
        draft_prompt = self.build_draft_prompt(query, passages)
        draft_answer = self.llm_client.generate(draft_prompt)
        
        # 3. Extract citations
        citations = self.citation_extractor.extract(draft_answer, passages)
        
        # 4. Refine with citations
        refined_prompt = self.build_refinement_prompt(
            query, draft_answer, citations
        )
        final_answer = self.llm_client.generate(refined_prompt)
        
        # 5. Verify claims
        verified_answer = self.verify_claims(final_answer, citations)
        
        return {
            "answer": verified_answer,
            "citations": citations,
            "sources": self.get_source_metadata(citations)
        }
    
    def verify_claims(self, answer: str, citations: List[Citation]):
        # Use NLI model to verify factual claims
        claims = self.extract_claims(answer)
        verified_claims = []
        
        for claim in claims:
            supporting_evidence = self.find_supporting_evidence(claim, citations)
            if self.nli_model.entails(claim, supporting_evidence):
                verified_claims.append(claim)
        
        return self.reconstruct_answer_with_verified_claims(verified_claims)`}
                              </pre>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                  <Zap className="h-4 w-4 text-orange-600" />
                                </div>
                                Caching Strategy
                              </h3>
                              <pre className="text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`class SearchCache:
    def __init__(self):
        self.query_cache = RedisCache(ttl=3600)  # 1 hour
        self.result_cache = RedisCache(ttl=1800)  # 30 min
        self.chunk_cache = RedisCache(ttl=7200)   # 2 hours
    
    def get_cached_result(self, query: str):
        # Check query cache first
        cache_key = self.hash_query(query)
        cached_result = self.query_cache.get(cache_key)
        
        if cached_result:
            return cached_result
        
        # Check result cache
        result_key = f"result:{cache_key}"
        return self.result_cache.get(result_key)
    
    def cache_result(self, query: str, result: dict):
        cache_key = self.hash_query(query)
        
        # Cache query -> result mapping
        self.query_cache.set(cache_key, result)
        
        # Cache individual result components
        if "documents" in result:
            for doc in result["documents"]:
                doc_key = f"doc:{doc.id}"
                self.chunk_cache.set(doc_key, doc.content)
    
    def hash_query(self, query: str):
        # Normalize and hash query for consistent caching
        normalized = self.normalize_query(query)
        return hashlib.md5(normalized.encode()).hexdigest()`}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* API Specifications */}
                  {question.title.includes('Perplexity') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                          <Server className="h-5 w-5 text-white" />
                        </div>
                        Perplexity API Specifications
                      </h2>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                  <SearchIcon className="h-4 w-4 text-blue-600" />
                                </div>
                                Search API
                              </h3>
                              <div className="space-y-4 text-sm">
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900">POST /api/v1/search</span>
                                    <span className="text-green-600 text-xs font-medium">200 OK</span>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Content-Type:</span>
                                      <span className="font-mono text-xs">application/json</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Authorization:</span>
                                      <span className="font-mono text-xs">Bearer {`{token}`}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">Request Body:</p>
                                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{
  "query": "string",
  "filters": {
    "index_type": ["news", "web", "papers", "code"],
    "date_range": {"from": "2024-01-01", "to": "2024-12-31"},
    "language": "en"
  },
  "limit": 10,
  "stream": true
}`}
                                  </pre>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">Response:</p>
                                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{
  "answer": "string",
  "sources": [
    {
      "url": "string",
      "title": "string",
      "snippet": "string",
      "relevance_score": 0.95
    }
  ],
  "metadata": {
    "processing_time": 1.2,
    "tokens_used": 1500,
    "model": "gpt-4"
  }
}`}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                  <Database className="h-4 w-4 text-green-600" />
                                </div>
                                Indexing API
                              </h3>
                              <div className="space-y-4 text-sm">
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900">POST /api/v1/index</span>
                                    <span className="text-green-600 text-xs font-medium">202 Accepted</span>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Content-Type:</span>
                                      <span className="font-mono text-xs">application/json</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">Request Body:</p>
                                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{
  "url": "string",
  "content": "string",
  "metadata": {
    "title": "string",
    "author": "string",
    "published_date": "2024-01-01",
    "index_type": "news|web|papers|code"
  },
  "priority": "high|normal|low"
}`}
                                  </pre>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                  <Shield className="h-4 w-4 text-purple-600" />
                                </div>
                                Authentication API
                              </h3>
                              <div className="space-y-4 text-sm">
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900">POST /api/v1/auth/login</span>
                                    <span className="text-green-600 text-xs font-medium">200 OK</span>
                                  </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">Request Body:</p>
                                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{
  "email": "user@example.com",
  "password": "string",
  "client_id": "string"
}`}
                                  </pre>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">Response:</p>
                                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{
  "access_token": "string",
  "refresh_token": "string",
  "expires_in": 3600,
  "token_type": "Bearer"
}`}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Pseudo Code Implementation */}
                  {question.title.includes('ChatGPT') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                          <Code className="h-5 w-5 text-white" />
                        </div>
                        ChatGPT Pseudo Code Implementation
                      </h2>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                  <MessageSquare className="h-4 w-4 text-green-600" />
                                </div>
                                Conversation Management
                              </h3>
                              <pre className="text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`class ConversationManager:
    def __init__(self):
        self.memory_system = MemorySystem()
        self.context_window = ContextWindow(max_tokens=128000)
    
    def process_message(self, user_id: str, message: str, conversation_id: str):
        # 1. Retrieve conversation context
        conversation = self.get_conversation(conversation_id)
        
        # 2. Add user message to context
        conversation.add_message("user", message)
        
        # 3. Manage context window
        if conversation.token_count > self.context_window.max_tokens:
            conversation = self.summarize_old_messages(conversation)
        
        # 4. Generate response
        response = self.generate_response(conversation)
        
        # 5. Update conversation
        conversation.add_message("assistant", response)
        self.save_conversation(conversation)
        
        return response
    
    def generate_response(self, conversation: Conversation):
        # Build context from conversation history
        context = self.build_context(conversation)
        
        # Select appropriate model
        model = self.select_model(conversation.complexity)
        
        # Generate response with streaming
        response_stream = self.llm_client.generate_stream(
            model=model,
            messages=context,
            temperature=0.7,
            max_tokens=1000
        )
        
        return response_stream
    
    def summarize_old_messages(self, conversation: Conversation):
        # Use LLM to summarize old messages
        old_messages = conversation.get_old_messages()
        summary = self.llm_client.summarize(old_messages)
        
        # Replace old messages with summary
        conversation.replace_old_messages_with_summary(summary)
        return conversation`}
                              </pre>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                  <Database className="h-4 w-4 text-blue-600" />
                                </div>
                                Memory System
                              </h3>
                              <pre className="text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`class MemorySystem:
    def __init__(self):
        self.short_term = RedisCache(ttl=3600)  # 1 hour
        self.long_term = PostgreSQL()
        self.vector_store = VectorDatabase()
    
    def store_memory(self, user_id: str, memory_type: str, content: str):
        # 1. Process and embed content
        embedding = self.embed_content(content)
        
        # 2. Store in appropriate memory
        if memory_type == "conversation":
            self.short_term.set(f"conv:{user_id}", content)
        elif memory_type == "fact":
            self.long_term.store_fact(user_id, content, embedding)
        elif memory_type == "preference":
            self.long_term.store_preference(user_id, content)
    
    def retrieve_relevant_memories(self, user_id: str, query: str):
        # 1. Get short-term context
        short_term = self.short_term.get(f"conv:{user_id}")
        
        # 2. Search long-term memories
        query_embedding = self.embed_content(query)
        relevant_facts = self.vector_store.search(
            query_embedding, 
            user_id=user_id, 
            limit=5
        )
        
        # 3. Get user preferences
        preferences = self.long_term.get_preferences(user_id)
        
        return {
            "short_term": short_term,
            "relevant_facts": relevant_facts,
            "preferences": preferences
        }
    
    def update_memory_importance(self, memory_id: str, importance_score: float):
        # Update memory importance based on usage
        self.long_term.update_importance(memory_id, importance_score)
        
        # If importance is high, move to permanent storage
        if importance_score > 0.8:
            self.promote_to_permanent(memory_id)`}
                              </pre>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                  <Zap className="h-4 w-4 text-purple-600" />
                                </div>
                                Streaming Response
                              </h3>
                              <pre className="text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`class StreamingService:
    def __init__(self):
        self.websocket_manager = WebSocketManager()
        self.token_buffer = TokenBuffer()
    
    async def stream_response(self, conversation_id: str, response_stream):
        # 1. Get WebSocket connection
        connection = self.websocket_manager.get_connection(conversation_id)
        
        # 2. Stream tokens as they arrive
        async for token in response_stream:
            # Buffer tokens for better UX
            self.token_buffer.add_token(token)
            
            # Send complete words/phrases
            if self.token_buffer.has_complete_word():
                complete_word = self.token_buffer.get_complete_word()
                await connection.send({
                    "type": "token",
                    "content": complete_word,
                    "conversation_id": conversation_id
                })
        
        # 3. Send completion signal
        await connection.send({
            "type": "complete",
            "conversation_id": conversation_id
        })
    
    def handle_typing_indicators(self, conversation_id: str):
        # Show typing indicator while generating
        connection = self.websocket_manager.get_connection(conversation_id)
        connection.send({
            "type": "typing",
            "status": "start"
        })
        
        # Stop typing indicator when complete
        connection.send({
            "type": "typing", 
            "status": "stop"
        })`}
                              </pre>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                  <Shield className="h-4 w-4 text-orange-600" />
                                </div>
                                Content Safety
                              </h3>
                              <pre className="text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`class ContentSafetyFilter:
    def __init__(self):
        self.toxicity_model = ToxicityClassifier()
        self.pii_detector = PIIDetector()
        self.prompt_injection_detector = PromptInjectionDetector()
    
    def filter_user_input(self, message: str):
        # 1. Check for prompt injection
        if self.prompt_injection_detector.detect(message):
            raise SecurityException("Prompt injection detected")
        
        # 2. Check for PII
        pii_found = self.pii_detector.extract_pii(message)
        if pii_found:
            message = self.pii_detector.redact_pii(message, pii_found)
        
        # 3. Check toxicity
        toxicity_score = self.toxicity_model.classify(message)
        if toxicity_score > 0.8:
            raise ContentException("Toxic content detected")
        
        return message
    
    def filter_ai_response(self, response: str):
        # 1. Check for harmful content
        harm_score = self.harm_classifier.classify(response)
        if harm_score > 0.7:
            response = self.harm_classifier.sanitize(response)
        
        # 2. Check for factual accuracy
        factual_claims = self.fact_extractor.extract(response)
        verified_claims = self.fact_checker.verify(factual_claims)
        
        # 3. Add disclaimers if needed
        if len(verified_claims) < len(factual_claims):
            response += "\\n\\nNote: Some claims may need verification."
        
        return response
    
    def apply_safety_prompts(self, system_prompt: str):
        # Add safety instructions to system prompt
        safety_prompt = self.get_safety_prompt()
        return system_prompt + "\\n\\n" + safety_prompt`}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {question.title.includes('ChatGPT') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                          <Server className="h-5 w-5 text-white" />
                        </div>
                        ChatGPT API Specifications
                      </h2>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                  <MessageSquare className="h-4 w-4 text-green-600" />
                                </div>
                                Chat API
                              </h3>
                              <div className="space-y-4 text-sm">
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900">POST /api/v1/chat/completions</span>
                                    <span className="text-green-600 text-xs font-medium">200 OK</span>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Content-Type:</span>
                                      <span className="font-mono text-xs">application/json</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Authorization:</span>
                                      <span className="font-mono text-xs">Bearer {`{token}`}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">Request Body:</p>
                                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{
  "model": "gpt-4",
  "messages": [
    {"role": "user", "content": "string"}
  ],
  "stream": true,
  "max_tokens": 1000,
  "temperature": 0.7,
  "conversation_id": "uuid"
}`}
                                  </pre>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">Response:</p>
                                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{
  "id": "chatcmpl-123",
  "object": "chat.completion.chunk",
  "choices": [{
    "delta": {"content": "string"},
    "finish_reason": null
  }],
  "usage": {
    "prompt_tokens": 100,
    "completion_tokens": 50
  }
}`}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                  <Database className="h-4 w-4 text-blue-600" />
                                </div>
                                Conversation API
                              </h3>
                              <div className="space-y-4 text-sm">
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900">GET /api/v1/conversations</span>
                                    <span className="text-green-600 text-xs font-medium">200 OK</span>
                                  </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">Response:</p>
                                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{
  "conversations": [
    {
      "id": "uuid",
      "title": "string",
      "created_at": "timestamp",
      "updated_at": "timestamp",
      "message_count": 10
    }
  ]
}`}
                                  </pre>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                  <Zap className="h-4 w-4 text-purple-600" />
                                </div>
                                Plugin API
                              </h3>
                              <div className="space-y-4 text-sm">
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900">POST /api/v1/plugins/execute</span>
                                    <span className="text-green-600 text-xs font-medium">200 OK</span>
                                  </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">Request Body:</p>
                                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{
  "plugin_id": "string",
  "function_name": "string",
  "parameters": {
    "param1": "value1"
  }
}`}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {question.title.includes('ElevenLabs') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                          <Code className="h-5 w-5 text-white" />
                        </div>
                        ElevenLabs Pseudo Code Implementation
                      </h2>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100">
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                  <MessageSquare className="h-4 w-4 text-purple-600" />
                                </div>
                                Voice Generation Engine
                              </h3>
                              <pre className="text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`/**
 * Voice Generation Engine - Enterprise-grade orchestration service for TTS operations
 * 
 * This service coordinates the entire voice synthesis pipeline with advanced features
 * including caching, load balancing, circuit breakers, and distributed tracing.
 * Implements the Strategy pattern for different voice models, Factory pattern for
 * audio processing components, and Observer pattern for real-time monitoring.
 * 
 * @implements IVoiceGenerationEngine
 * @implements IObservable<VoiceGenerationEvent>
 */
class VoiceGenerationEngine implements IVoiceGenerationEngine, IObservable<VoiceGenerationEvent> {
    private readonly textAnalyzer: ITextAnalyzer;
    private readonly voiceModelManager: IVoiceModelManager;
    private readonly audioProcessor: IAudioProcessor;
    private readonly gpuManager: IGPUManager;
    private readonly cacheManager: ICacheManager;
    private readonly circuitBreaker: ICircuitBreaker;
    private readonly loadBalancer: ILoadBalancer;
    private readonly logger: ILogger;
    private readonly metrics: IMetricsCollector;
    private readonly tracer: ITracer;
    private readonly eventBus: IEventBus;
    private readonly observers: Set<IObserver<VoiceGenerationEvent>> = new Set();
    private readonly rateLimiter: IRateLimiter;
    private readonly healthChecker: IHealthChecker;

    constructor(
        textAnalyzer: ITextAnalyzer,
        voiceModelManager: IVoiceModelManager,
        audioProcessor: IAudioProcessor,
        gpuManager: IGPUManager,
        cacheManager: ICacheManager,
        circuitBreaker: ICircuitBreaker,
        loadBalancer: ILoadBalancer,
        logger: ILogger,
        metrics: IMetricsCollector,
        tracer: ITracer,
        eventBus: IEventBus,
        rateLimiter: IRateLimiter,
        healthChecker: IHealthChecker
    ) {
        this.textAnalyzer = textAnalyzer;
        this.voiceModelManager = voiceModelManager;
        this.audioProcessor = audioProcessor;
        this.gpuManager = gpuManager;
        this.cacheManager = cacheManager;
        this.circuitBreaker = circuitBreaker;
        this.loadBalancer = loadBalancer;
        this.logger = logger;
        this.metrics = metrics;
        this.tracer = tracer;
        this.eventBus = eventBus;
        this.rateLimiter = rateLimiter;
        this.healthChecker = healthChecker;
    }

    /**
     * Generates voice audio from text input with enterprise-grade features
     * 
     * @param request - Voice generation request with advanced options
     * @param context - Request context including user, session, and tracing info
     * @returns Promise<VoiceResponse> - Generated audio with comprehensive metadata
     * @throws VoiceGenerationException - When generation fails
     * @throws RateLimitExceededException - When rate limit is exceeded
     * @throws CircuitBreakerOpenException - When circuit breaker is open
     */
    public async generateVoice(request: VoiceRequest, context: RequestContext): Promise<VoiceResponse> {
        const span = this.tracer.startSpan('voice_generation');
        const startTime = Date.now();
        const requestId = this.generateRequestId();
        
        try {
            // Pre-flight checks
            await this.performPreFlightChecks(request, context);
            
            // Rate limiting
            await this.rateLimiter.checkLimit(context.userId, 'voice_generation');
            
            // Circuit breaker check
            if (this.circuitBreaker.isOpen()) {
                throw new CircuitBreakerOpenException('Service temporarily unavailable');
            }
            
            // Check cache first
            const cacheKey = this.generateCacheKey(request, context);
            const cachedResponse = await this.cacheManager.get(cacheKey);
            if (cachedResponse) {
                this.metrics.recordCacheHit('voice_generation_cache');
                this.notifyObservers(new VoiceGenerationEvent('CACHE_HIT', requestId, context));
                return cachedResponse as VoiceResponse;
            }
            
            this.logger.info('Starting voice generation', { 
                requestId, 
                voiceId: request.voiceId,
                userId: context.userId,
                sessionId: context.sessionId 
            });
            
            // Notify observers of generation start
            this.notifyObservers(new VoiceGenerationEvent('GENERATION_STARTED', requestId, context));
            
            // Step 1: Validate and preprocess input with advanced validation
            const validatedRequest = await this.validateRequestWithCircuitBreaker(request, context);
            
            // Step 2: Perform text analysis with caching
            const textAnalysis = await this.analyzeTextWithCache(validatedRequest.text, context);
            
            // Step 3: Load and prepare voice model with load balancing
            const voiceModel = await this.loadModelWithLoadBalancing(validatedRequest.voiceId, context);
            
            // Step 4: Allocate computational resources with priority queuing
            const gpuContext = await this.allocateGPUWithPriority(voiceModel, validatedRequest, context);
            
            try {
                // Step 5: Generate raw audio waveform with progress tracking
                const rawAudio = await this.generateWaveformWithProgress(textAnalysis, voiceModel, gpuContext, context);
                
                // Step 6: Apply audio post-processing with quality assurance
                const processedAudio = await this.processAudioWithQualityCheck(rawAudio, validatedRequest, context);
                
                // Step 7: Apply voice-specific settings and optimizations
                const finalAudio = this.applyVoiceSettingsWithValidation(processedAudio, validatedRequest.voiceSettings);
                
                // Step 8: Generate comprehensive response with metadata
                const response = this.buildResponseWithMetadata(finalAudio, textAnalysis, voiceModel, requestId, context);
                
                // Step 9: Cache the result for future requests
                await this.cacheManager.set(cacheKey, response, this.calculateCacheTTL(request));
                
                // Record metrics and notify observers
                this.recordMetrics('voice_generation', Date.now() - startTime, context);
                this.notifyObservers(new VoiceGenerationEvent('GENERATION_COMPLETED', requestId, context, response));
                
                this.logger.info('Voice generation completed successfully', { 
                    requestId, 
                    duration: response.duration,
                    quality: response.qualityMetrics.overallScore
                });
                
                return response;
                
            } finally {
                await this.gpuManager.releaseGPU(gpuContext);
                span.end();
            }
            
        } catch (error) {
            this.handleGenerationError(error, requestId, context, span);
            throw error;
        }
    }

    /**
     * Generates audio waveform with real-time progress tracking and optimization
     */
    private async generateWaveformWithProgress(
        textAnalysis: TextAnalysis, 
        voiceModel: IVoiceModel, 
        gpuContext: GPUContext,
        context: RequestContext
    ): Promise<AudioData> {
        const { phonemes, prosody, language } = textAnalysis;
        
        // Optimize phoneme sequence for better performance
        const optimizedPhonemes = await this.optimizePhonemeSequence(phonemes, language);
        
        // Generate mel-spectrogram with progress tracking
        const melSpectrogram = await this.generateMelSpectrogramWithProgress(
            optimizedPhonemes, 
            prosody, 
            language, 
            voiceModel, 
            gpuContext,
            context
        );
        
        // Convert to waveform with quality optimization
        const waveform = await this.convertToWaveformWithOptimization(melSpectrogram, voiceModel, gpuContext);
        
        return waveform;
    }

    /**
     * Applies voice settings with validation and quality assurance
     */
    private applyVoiceSettingsWithValidation(audio: AudioData, settings: VoiceSettings): AudioData {
        let processedAudio = audio;
        
        // Validate settings before application
        this.validateVoiceSettings(settings);
        
        // Apply stability filter with adaptive parameters
        if (settings.stability < 1.0) {
            processedAudio = this.applyAdaptiveStabilityFilter(processedAudio, settings);
        }
        
        // Apply similarity boost with reference validation
        if (settings.similarityBoost > 0.0) {
            processedAudio = this.applySimilarityBoostWithValidation(processedAudio, settings);
        }
        
        // Apply emotion modifications with style transfer
        if (settings.emotion) {
            processedAudio = this.applyEmotionModificationWithStyleTransfer(processedAudio, settings);
        }
        
        // Apply advanced voice effects
        if (settings.effects) {
            processedAudio = this.applyVoiceEffects(processedAudio, settings.effects);
        }
        
        // Quality validation after all modifications
        this.validateAudioQuality(processedAudio, settings);
        
        return processedAudio;
    }

    /**
     * Observer pattern implementation for real-time monitoring
     */
    public subscribe(observer: IObserver<VoiceGenerationEvent>): void {
        this.observers.add(observer);
    }

    public unsubscribe(observer: IObserver<VoiceGenerationEvent>): void {
        this.observers.delete(observer);
    }

    private notifyObservers(event: VoiceGenerationEvent): void {
        this.observers.forEach(observer => {
            try {
                observer.update(event);
            } catch (error) {
                this.logger.error('Observer notification failed', { error: error.message });
            }
        });
    }

    /**
     * Advanced error handling with circuit breaker integration
     */
    private handleGenerationError(error: Error, requestId: string, context: RequestContext, span: ISpan): void {
        this.circuitBreaker.recordFailure();
        this.metrics.recordError('voice_generation', error);
        this.logger.error('Voice generation failed', { 
            requestId, 
            userId: context.userId,
            error: error.message,
            stack: error.stack 
        });
        this.notifyObservers(new VoiceGenerationEvent('GENERATION_FAILED', requestId, context, null, error));
        span.setTag('error', true);
        span.setTag('error.message', error.message);
    }

    private generateRequestId(): string {
        return 'voice_' + crypto.randomUUID();
    }

    private generateCacheKey(request: VoiceRequest, context: RequestContext): string {
        return crypto.createHash('sha256')
            .update(JSON.stringify({ request, context.userId }))
            .digest('hex');
    }

    private calculateCacheTTL(request: VoiceRequest): number {
        // Dynamic TTL based on request characteristics
        const baseTTL = 3600; // 1 hour
        const qualityMultiplier = request.quality === 'high' ? 2 : 1;
        const lengthMultiplier = request.text.length > 1000 ? 1.5 : 1;
        return baseTTL * qualityMultiplier * lengthMultiplier;
    }
}`}
                              </pre>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                                  <Database className="h-4 w-4 text-pink-600" />
                                </div>
                                Voice Model Management
                              </h3>
                              <pre className="text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`/**
 * Voice Model Manager - Enterprise-grade model lifecycle management
 * 
 * Manages voice model loading, caching, custom voice creation, and voice cloning
 * with advanced features including model versioning, A/B testing, and distributed
 * model serving. Implements the Repository pattern, Factory pattern, and Strategy
 * pattern for different model types and deployment strategies.
 * 
 * @implements IVoiceModelManager
 * @implements IModelVersionManager
 */
class VoiceModelManager implements IVoiceModelManager, IModelVersionManager {
    private readonly modelCache: IModelCache;
    private readonly voiceRepository: IVoiceRepository;
    private readonly modelLoader: IModelLoader;
    private readonly modelValidator: IModelValidator;
    private readonly modelOptimizer: IModelOptimizer;
    private readonly modelDeployer: IModelDeployer;
    private readonly versionManager: IVersionManager;
    private readonly aBTester: IABTester;
    private readonly logger: ILogger;
    private readonly metrics: IMetricsCollector;
    private readonly tracer: ITracer;
    private readonly eventBus: IEventBus;
    private readonly healthChecker: IHealthChecker;
    private readonly modelRegistry: IModelRegistry;

    constructor(
        modelCache: IModelCache,
        voiceRepository: IVoiceRepository,
        modelLoader: IModelLoader,
        modelValidator: IModelValidator,
        modelOptimizer: IModelOptimizer,
        modelDeployer: IModelDeployer,
        versionManager: IVersionManager,
        aBTester: IABTester,
        logger: ILogger,
        metrics: IMetricsCollector,
        tracer: ITracer,
        eventBus: IEventBus,
        healthChecker: IHealthChecker,
        modelRegistry: IModelRegistry
    ) {
        this.modelCache = modelCache;
        this.voiceRepository = voiceRepository;
        this.modelLoader = modelLoader;
        this.modelValidator = modelValidator;
        this.modelOptimizer = modelOptimizer;
        this.modelDeployer = modelDeployer;
        this.versionManager = versionManager;
        this.aBTester = aBTester;
        this.logger = logger;
        this.metrics = metrics;
        this.tracer = tracer;
        this.eventBus = eventBus;
        this.healthChecker = healthChecker;
        this.modelRegistry = modelRegistry;
    }

    /**
     * Loads a voice model with advanced caching, validation, and optimization
     * 
     * @param voiceId - Unique identifier for the voice model
     * @param context - Request context for A/B testing and versioning
     * @returns Promise<IVoiceModel> - Loaded and optimized voice model instance
     * @throws ModelNotFoundException - When model is not found
     * @throws ModelLoadException - When model loading fails
     * @throws ModelValidationException - When model validation fails
     */
    public async loadModel(voiceId: string, context: RequestContext): Promise<IVoiceModel> {
        const span = this.tracer.startSpan('model_loading');
        const startTime = Date.now();
        
        try {
            // Determine model version based on A/B testing and user context
            const modelVersion = await this.determineModelVersion(voiceId, context);
            const cacheKey = this.generateModelCacheKey(voiceId, modelVersion, context);
            
            // Check multi-level cache (L1: memory, L2: distributed cache)
            const cachedModel = await this.getModelFromCache(cacheKey);
            if (cachedModel) {
                this.metrics.recordCacheHit('voice_model_cache');
                this.logger.debug('Model loaded from cache', { voiceId, version: modelVersion });
                return cachedModel;
            }

            this.metrics.recordCacheMiss('voice_model_cache');
            
            // Load model metadata with versioning support
            const voiceMetadata = await this.voiceRepository.getVoiceWithVersion(voiceId, modelVersion);
            if (!voiceMetadata) {
                throw new ModelNotFoundException('Voice model not found: ' + voiceId + ' version: ' + modelVersion);
            }

            // Validate model integrity and compatibility
            await this.modelValidator.validateModel(voiceMetadata);
            
            // Load model with optimization and quantization
            const rawModel = await this.modelLoader.loadModel({
                modelPath: voiceMetadata.modelPath,
                modelConfig: voiceMetadata.modelConfig,
                modelType: voiceMetadata.modelType,
                version: modelVersion
            });

            // Optimize model for inference performance
            const optimizedModel = await this.modelOptimizer.optimizeModel(rawModel, {
                targetDevice: context.targetDevice,
                optimizationLevel: context.optimizationLevel,
                quantization: context.quantization
            });

            // Deploy model to appropriate serving infrastructure
            const deployedModel = await this.modelDeployer.deployModel(optimizedModel, {
                deploymentStrategy: voiceMetadata.deploymentStrategy,
                scalingPolicy: voiceMetadata.scalingPolicy,
                healthCheckConfig: voiceMetadata.healthCheckConfig
            });

            // Cache the deployed model with intelligent TTL
            await this.cacheModelWithIntelligentTTL(cacheKey, deployedModel, voiceMetadata);
            
            // Register model in model registry for monitoring
            await this.modelRegistry.registerModel(deployedModel, {
                voiceId: voiceId,
                version: modelVersion,
                metadata: voiceMetadata
            });
            
            this.metrics.recordSuccess('model_loading', Date.now() - startTime);
            this.logger.info('Model loaded and deployed successfully', { 
                voiceId, 
                version: modelVersion,
                modelType: voiceMetadata.modelType,
                deploymentStatus: deployedModel.getDeploymentStatus()
            });
            
            return deployedModel;
            
        } catch (error) {
            this.handleModelLoadError(error, voiceId, context, span);
            throw error;
        } finally {
            span.end();
        }
    }

    /**
     * Creates a custom voice model with advanced training and validation
     * 
     * @param request - Custom voice creation request with advanced options
     * @param context - Training context and resource allocation
     * @returns Promise<CustomVoiceResult> - Comprehensive creation result
     */
    public async createCustomVoice(request: CustomVoiceRequest, context: TrainingContext): Promise<CustomVoiceResult> {
        const span = this.tracer.startSpan('custom_voice_creation');
        const startTime = Date.now();
        const voiceId = this.generateVoiceId();
        
        try {
            this.logger.info('Starting custom voice creation', { 
                voiceId, 
                sampleCount: request.samples.length,
                trainingConfig: request.trainingConfig 
            });
            
            // Step 1: Advanced sample validation and preprocessing
            const processedSamples = await this.preprocessSamplesWithValidation(request.samples, {
                qualityThreshold: request.qualityThreshold,
                noiseReduction: request.noiseReduction,
                normalization: request.normalization
            });
            
            // Step 2: Extract comprehensive voice characteristics
            const voiceCharacteristics = await this.extractVoiceCharacteristicsWithML(processedSamples, {
                featureExtraction: request.featureExtraction,
                dimensionalityReduction: request.dimensionalityReduction
            });
            
            // Step 3: Perform advanced model fine-tuning with hyperparameter optimization
            const customModel = await this.fineTuneModelWithOptimization({
                baseModel: request.baseModel || 'eleven_monolingual_v1',
                voiceCharacteristics: voiceCharacteristics,
                samples: processedSamples,
                trainingConfig: request.trainingConfig,
                hyperparameterOptimization: request.hyperparameterOptimization,
                distributedTraining: request.distributedTraining
            });
            
            // Step 4: Comprehensive model validation and quality assessment
            const qualityMetrics = await this.validateModelQualityComprehensive(customModel, processedSamples, {
                qualityMetrics: request.qualityMetrics,
                comparisonBaseline: request.comparisonBaseline
            });
            
            if (qualityMetrics.overallScore < request.minQualityThreshold) {
                throw new ModelQualityException('Model quality below threshold: ' + qualityMetrics.overallScore);
            }
            
            // Step 5: Model optimization and deployment preparation
            const optimizedModel = await this.prepareModelForDeployment(customModel, {
                optimizationLevel: request.optimizationLevel,
                quantization: request.quantization,
                deploymentStrategy: request.deploymentStrategy
            });
            
            // Step 6: Save model with versioning and metadata
            const savedVoiceId = await this.saveModelWithVersioning({
                id: voiceId,
                name: request.name,
                model: optimizedModel,
                characteristics: voiceCharacteristics,
                qualityMetrics: qualityMetrics,
                metadata: request.metadata,
                versioning: request.versioning
            });
            
            // Step 7: Deploy model with monitoring and health checks
            const deploymentResult = await this.deployModelWithMonitoring(optimizedModel, {
                voiceId: savedVoiceId,
                deploymentConfig: request.deploymentConfig,
                monitoringConfig: request.monitoringConfig
            });
            
            this.metrics.recordSuccess('custom_voice_creation', Date.now() - startTime);
            this.logger.info('Custom voice created and deployed successfully', { 
                voiceId: savedVoiceId, 
                qualityScore: qualityMetrics.overallScore,
                deploymentStatus: deploymentResult.status
            });
            
            return new CustomVoiceResult({
                voiceId: savedVoiceId,
                qualityMetrics: qualityMetrics,
                deploymentResult: deploymentResult,
                trainingMetrics: customModel.getTrainingMetrics()
            });
            
        } catch (error) {
            this.handleCustomVoiceCreationError(error, voiceId, context, span);
            throw error;
        } finally {
            span.end();
        }
    }

    /**
     * Creates a voice clone with advanced few-shot learning and quality assurance
     * 
     * @param request - Voice cloning request with advanced options
     * @param context - Cloning context and resource allocation
     * @returns Promise<VoiceCloneResult> - Comprehensive cloning result
     */
    public async cloneVoice(request: VoiceCloneRequest, context: CloningContext): Promise<VoiceCloneResult> {
        const span = this.tracer.startSpan('voice_cloning');
        const startTime = Date.now();
        const cloneId = this.generateVoiceId();
        
        try {
            this.logger.info('Starting voice cloning', { 
                cloneId, 
                sourceAudioCount: request.sourceAudio.length,
                cloningMethod: request.cloningMethod 
            });
            
            // Step 1: Advanced audio preprocessing and quality assessment
            const processedAudio = await this.preprocessAudioForCloning(request.sourceAudio, {
                qualityThreshold: request.qualityThreshold,
                noiseReduction: request.noiseReduction,
                featureExtraction: request.featureExtraction
            });
            
            // Step 2: Extract speaker embeddings with advanced techniques
            const speakerEmbedding = await this.extractSpeakerEmbeddingAdvanced(processedAudio, {
                embeddingMethod: request.embeddingMethod,
                dimensionality: request.embeddingDimensionality,
                normalization: request.embeddingNormalization
            });
            
            // Step 3: Create voice clone using advanced few-shot learning
            const cloneModel = await this.createVoiceCloneAdvanced({
                speakerEmbedding: speakerEmbedding,
                baseModel: request.baseModel || 'eleven_monolingual_v1',
                cloneConfig: request.cloneConfig,
                fewShotConfig: request.fewShotConfig,
                transferLearning: request.transferLearning
            });
            
            // Step 4: Comprehensive quality validation and similarity assessment
            const qualityMetrics = await this.validateCloneQualityAdvanced(cloneModel, processedAudio, {
                similarityMetrics: request.similarityMetrics,
                qualityThresholds: request.qualityThresholds,
                comparisonMethods: request.comparisonMethods
            });
            
            if (qualityMetrics.similarityScore < request.minSimilarityThreshold) {
                throw new CloneQualityException('Clone similarity below threshold: ' + qualityMetrics.similarityScore);
            }
            
            // Step 5: Model optimization and deployment
            const optimizedClone = await this.optimizeCloneModel(cloneModel, {
                optimizationLevel: request.optimizationLevel,
                quantization: request.quantization
            });
            
            // Step 6: Save cloned model with comprehensive metadata
            const savedCloneId = await this.saveCloneModel({
                id: cloneId,
                name: request.name || 'Clone of ' + request.originalVoiceName,
                model: optimizedClone,
                characteristics: qualityMetrics.characteristics,
                qualityMetrics: qualityMetrics,
                metadata: {
                    ...request.metadata,
                    isClone: true,
                    originalVoiceId: request.originalVoiceId,
                    cloningMethod: request.cloningMethod,
                    similarityScore: qualityMetrics.similarityScore
                }
            });
            
            this.metrics.recordSuccess('voice_cloning', Date.now() - startTime);
            this.logger.info('Voice cloning completed successfully', { 
                cloneId: savedCloneId, 
                similarityScore: qualityMetrics.similarityScore,
                qualityScore: qualityMetrics.overallScore
            });
            
            return new VoiceCloneResult({
                cloneId: savedCloneId,
                qualityMetrics: qualityMetrics,
                similarityScore: qualityMetrics.similarityScore,
                cloningMetrics: cloneModel.getCloningMetrics()
            });
            
        } catch (error) {
            this.handleVoiceCloningError(error, cloneId, context, span);
            throw error;
        } finally {
            span.end();
        }
    }

    /**
     * Model versioning and A/B testing support
     */
    public async determineModelVersion(voiceId: string, context: RequestContext): Promise<string> {
        // Check if user is in A/B test
        const abTestVariant = await this.aBTester.getVariant(context.userId, 'model_version_' + voiceId);
        if (abTestVariant) {
            return abTestVariant.modelVersion;
        }
        
        // Return default version or latest stable version
        return await this.versionManager.getLatestStableVersion(voiceId);
    }

    private generateVoiceId(): string {
        return 'voice_' + crypto.randomUUID();
    }

    private generateModelCacheKey(voiceId: string, version: string, context: RequestContext): string {
        return crypto.createHash('sha256')
            .update(JSON.stringify({ voiceId, version, userId: context.userId }))
            .digest('hex');
    }

    private async getModelFromCache(cacheKey: string): Promise<IVoiceModel | null> {
        // Try L1 cache (memory) first
        const l1Result = this.modelCache.getL1(cacheKey);
        if (l1Result) return l1Result;
        
        // Try L2 cache (distributed)
        const l2Result = await this.modelCache.getL2(cacheKey);
        if (l2Result) {
            // Populate L1 cache
            this.modelCache.setL1(cacheKey, l2Result);
            return l2Result;
        }
        
        return null;
    }

    private async cacheModelWithIntelligentTTL(cacheKey: string, model: IVoiceModel, metadata: VoiceMetadata): Promise<void> {
        const ttl = this.calculateIntelligentTTL(metadata);
        await this.modelCache.setL2(cacheKey, model, ttl);
        this.modelCache.setL1(cacheKey, model, ttl);
    }

    private calculateIntelligentTTL(metadata: VoiceMetadata): number {
        // Dynamic TTL based on model characteristics
        const baseTTL = 3600; // 1 hour
        const popularityMultiplier = metadata.popularity || 1;
        const sizeMultiplier = metadata.modelSize > 1000000000 ? 0.5 : 1; // Large models cache for shorter time
        const qualityMultiplier = metadata.qualityScore > 0.9 ? 2 : 1;
        
        return Math.floor(baseTTL * popularityMultiplier * sizeMultiplier * qualityMultiplier);
    }
}`}
                              </pre>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                  <Zap className="h-4 w-4 text-red-600" />
                                </div>
                                Audio Processing Pipeline
                              </h3>
                              <pre className="text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`/**
 * Audio Processing Pipeline - Handles audio enhancement and post-processing
 * 
 * Implements a multi-stage audio processing pipeline with quality validation.
 * Uses the Chain of Responsibility pattern for processing stages and the
 * Strategy pattern for different enhancement algorithms.
 */
class AudioProcessor implements IAudioProcessor {
    private readonly noiseReducer: INoiseReducer;
    private readonly enhancer: IAudioEnhancer;
    private readonly formatter: IAudioFormatter;
    private readonly qualityChecker: IQualityChecker;
    private readonly logger: ILogger;
    private readonly metrics: IMetricsCollector;

    constructor(
        noiseReducer: INoiseReducer,
        enhancer: IAudioEnhancer,
        formatter: IAudioFormatter,
        qualityChecker: IQualityChecker,
        logger: ILogger,
        metrics: IMetricsCollector
    ) {
        this.noiseReducer = noiseReducer;
        this.enhancer = enhancer;
        this.formatter = formatter;
        this.qualityChecker = qualityChecker;
        this.logger = logger;
        this.metrics = metrics;
    }

    /**
     * Processes audio through the complete enhancement pipeline
     * 
     * @param audio - Raw audio data to process
     * @param options - Processing options and quality settings
     * @returns Promise<AudioData> - Enhanced and processed audio
     */
    public async process(audio: AudioData, options: ProcessingOptions): Promise<AudioData> {
        const startTime = Date.now();
        const processId = this.generateProcessId();
        
        try {
            this.logger.info('Starting audio processing', { processId, audioLength: audio.samples.length });
            
            // Stage 1: Noise reduction and cleaning
            const cleanedAudio = await this.noiseReducer.reduceNoise(audio, {
                algorithm: options.noiseReductionAlgorithm,
                intensity: options.noiseReductionIntensity
            });
            
            // Stage 2: Audio enhancement and optimization
            const enhancedAudio = await this.enhancer.enhance(cleanedAudio, {
                quality: options.quality,
                enhancementLevel: options.enhancementLevel
            });
            
            // Stage 3: Quality validation and feedback loop
            const qualityScore = await this.qualityChecker.checkQuality(enhancedAudio);
            this.logger.debug('Audio quality assessment', { processId, qualityScore });
            
            // Apply additional enhancement if quality is below threshold
            let finalAudio = enhancedAudio;
            if (qualityScore < options.minQualityThreshold) {
                this.logger.info('Quality below threshold, applying additional enhancement', { 
                    processId, qualityScore, threshold: options.minQualityThreshold 
                });
                finalAudio = await this.enhancer.enhanceFurther(enhancedAudio, {
                    targetQuality: options.minQualityThreshold
                });
            }
            
            // Stage 4: Format conversion and optimization
            const processedAudio = await this.formatter.convert(finalAudio, {
                targetFormat: options.outputFormat,
                bitrate: options.bitrate,
                sampleRate: options.sampleRate
            });
            
            this.metrics.recordSuccess('audio_processing', Date.now() - startTime);
            this.logger.info('Audio processing completed successfully', { 
                processId, 
                finalQuality: qualityScore,
                outputFormat: options.outputFormat 
            });
            
            return processedAudio;
            
        } catch (error) {
            this.metrics.recordError('audio_processing', error);
            this.logger.error('Audio processing failed', { processId, error: error.message });
            throw new AudioProcessingException('Failed to process audio', error);
        }
    }

    /**
     * Applies comprehensive audio enhancement using multiple algorithms
     */
    public async enhance(audio: AudioData, options: EnhancementOptions): Promise<AudioData> {
        let enhancedAudio = audio;
        
        // Step 1: Spectral subtraction for noise reduction
        if (options.applySpectralSubtraction) {
            enhancedAudio = await this.applySpectralSubtraction(enhancedAudio, options.spectralParams);
        }
        
        // Step 2: Dynamic range compression
        if (options.applyCompression) {
            enhancedAudio = await this.applyDynamicRangeCompression(enhancedAudio, options.compressionParams);
        }
        
        // Step 3: Multi-band equalization
        if (options.applyEqualization) {
            enhancedAudio = await this.applyEqualization(enhancedAudio, options.equalizationParams);
        }
        
        // Step 4: Peak limiting and normalization
        if (options.applyLimiting) {
            enhancedAudio = await this.applyLimiter(enhancedAudio, options.limiterParams);
        }
        
        // Step 5: Harmonic enhancement
        if (options.applyHarmonicEnhancement) {
            enhancedAudio = await this.applyHarmonicEnhancement(enhancedAudio, options.harmonicParams);
        }
        
        return enhancedAudio;
    }

    /**
     * Applies voice-specific settings and optimizations
     */
    public applyVoiceSettings(audio: AudioData, settings: VoiceSettings): AudioData {
        let processedAudio = audio;
        
        // Apply stability filter to reduce variation in pitch and timing
        if (settings.stability < 1.0) {
            processedAudio = this.applyStabilityFilter(processedAudio, {
                stabilityLevel: settings.stability,
                smoothingWindow: settings.smoothingWindow
            });
        }
        
        // Apply similarity boost to enhance voice characteristics
        if (settings.similarityBoost > 0.0) {
            processedAudio = this.applySimilarityBoost(processedAudio, {
                boostLevel: settings.similarityBoost,
                referenceVoice: settings.referenceVoice
            });
        }
        
        // Apply emotion and style modifications
        if (settings.emotion) {
            processedAudio = this.applyEmotionModification(processedAudio, {
                emotion: settings.emotion,
                intensity: settings.emotionIntensity
            });
        }
        
        return processedAudio;
    }

    private generateProcessId(): string {
        return 'audio_' + crypto.randomUUID();
    }
}`}
                              </pre>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                  <Shield className="h-4 w-4 text-orange-600" />
                                </div>
                                Text Analysis & Language Processing
                              </h3>
                              <pre className="text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`/**
 * Text Analysis Engine - Handles linguistic processing and text-to-speech preparation
 * 
 * Performs comprehensive text analysis including language detection, phoneme conversion,
 * prosody analysis, and SSML processing. Implements the Strategy pattern for different
 * language processors and the Factory pattern for analysis components.
 */
class TextAnalyzer implements ITextAnalyzer {
    private readonly languageDetector: ILanguageDetector;
    private readonly phonemizer: IPhonemizer;
    private readonly prosodyAnalyzer: IProsodyAnalyzer;
    private readonly textNormalizer: ITextNormalizer;
    private readonly ssmlProcessor: ISSMLProcessor;
    private readonly logger: ILogger;
    private readonly metrics: IMetricsCollector;

    constructor(
        languageDetector: ILanguageDetector,
        phonemizer: IPhonemizer,
        prosodyAnalyzer: IProsodyAnalyzer,
        textNormalizer: ITextNormalizer,
        ssmlProcessor: ISSMLProcessor,
        logger: ILogger,
        metrics: IMetricsCollector
    ) {
        this.languageDetector = languageDetector;
        this.phonemizer = phonemizer;
        this.prosodyAnalyzer = prosodyAnalyzer;
        this.textNormalizer = textNormalizer;
        this.ssmlProcessor = ssmlProcessor;
        this.logger = logger;
        this.metrics = metrics;
    }

    /**
     * Performs comprehensive text analysis for TTS processing
     * 
     * @param text - Input text to analyze
     * @param options - Analysis options and preferences
     * @returns Promise<TextAnalysis> - Complete text analysis result
     */
    public async analyze(text: string, options: AnalysisOptions = {}): Promise<TextAnalysis> {
        const startTime = Date.now();
        const analysisId = this.generateAnalysisId();
        
        try {
            this.logger.info('Starting text analysis', { analysisId, textLength: text.length });
            
            // Step 1: Text normalization and preprocessing
            const normalizedText = await this.textNormalizer.normalize(text, {
                preserveSSML: options.preserveSSML,
                normalizeNumbers: options.normalizeNumbers,
                expandAbbreviations: options.expandAbbreviations
            });
            
            // Step 2: Language detection and validation
            const language = await this.languageDetector.detect(normalizedText, {
                fallbackLanguage: options.fallbackLanguage,
                confidenceThreshold: options.languageConfidenceThreshold
            });
            
            // Step 3: Phoneme conversion with language-specific rules
            const phonemes = await this.phonemizer.convert(normalizedText, language, {
                dialect: options.dialect,
                pronunciationGuide: options.pronunciationGuide
            });
            
            // Step 4: Prosody analysis for natural speech patterns
            const prosody = await this.prosodyAnalyzer.analyze(normalizedText, language, {
                emotion: options.emotion,
                speakingRate: options.speakingRate,
                pitchRange: options.pitchRange
            });
            
            // Step 5: SSML processing if markup is present
            let finalPhonemes = phonemes;
            let finalProsody = prosody;
            
            if (this.containsSSML(normalizedText)) {
                const ssmlResult = await this.ssmlProcessor.process(normalizedText, {
                    phonemes: phonemes,
                    prosody: prosody,
                    language: language
                });
                finalPhonemes = ssmlResult.phonemes;
                finalProsody = ssmlResult.prosody;
            }
            
            // Step 6: Build comprehensive analysis result
            const analysis = new TextAnalysis({
                originalText: text,
                normalizedText: normalizedText,
                language: language,
                phonemes: finalPhonemes,
                prosody: finalProsody,
                metadata: this.extractMetadata(text, language),
                analysisId: analysisId
            });
            
            this.metrics.recordSuccess('text_analysis', Date.now() - startTime);
            this.logger.info('Text analysis completed successfully', { 
                analysisId, 
                language, 
                phonemeCount: finalPhonemes.length 
            });
            
            return analysis;
            
        } catch (error) {
            this.metrics.recordError('text_analysis', error);
            this.logger.error('Text analysis failed', { analysisId, error: error.message });
            throw new TextAnalysisException('Failed to analyze text', error);
        }
    }

    /**
     * Converts text to phonemes using language-specific rules and algorithms
     */
    public async convertToPhonemes(text: string, language: string, options: PhonemizationOptions = {}): Promise<Phoneme[]> {
        try {
            // Select appropriate phonemizer based on language
            const phonemizer = this.getPhonemizerForLanguage(language);
            
            // Apply language-specific phonemization rules
            const phonemes = await phonemizer.convert(text, {
                dialect: options.dialect,
                stressMarking: options.stressMarking,
                syllabification: options.syllabification
            });
            
            // Apply post-processing if specified
            if (options.applyPostProcessing) {
                return this.applyPhonemePostProcessing(phonemes, language);
            }
            
            return phonemes;
            
        } catch (error) {
            this.logger.error('Phonemization failed', { language, error: error.message });
            throw new PhonemizationException('Failed to convert text to phonemes', error);
        }
    }

    /**
     * Analyzes prosodic features for natural speech synthesis
     */
    public async analyzeProsody(text: string, language: string, options: ProsodyOptions = {}): Promise<ProsodyFeatures> {
        try {
            const prosody = new ProsodyFeatures();
            
            // Step 1: Detect sentence boundaries and structure
            prosody.sentenceBoundaries = await this.detectSentenceBoundaries(text, language);
            
            // Step 2: Analyze word stress patterns
            prosody.wordStress = await this.analyzeWordStress(text, language, {
                stressModel: options.stressModel,
                lexicalStress: options.lexicalStress
            });
            
            // Step 3: Analyze intonation patterns
            prosody.intonation = await this.analyzeIntonation(text, language, {
                intonationModel: options.intonationModel,
                emotion: options.emotion
            });
            
            // Step 4: Analyze pause patterns and timing
            prosody.pauses = await this.analyzePausePatterns(text, language, {
                pauseModel: options.pauseModel,
                speakingRate: options.speakingRate
            });
            
            // Step 5: Analyze rhythm and timing
            prosody.rhythm = await this.analyzeRhythm(text, language, {
                rhythmModel: options.rhythmModel,
                tempo: options.tempo
            });
            
            return prosody;
            
        } catch (error) {
            this.logger.error('Prosody analysis failed', { language, error: error.message });
            throw new ProsodyAnalysisException('Failed to analyze prosody', error);
        }
    }

    private getPhonemizerForLanguage(language: string): IPhonemizer {
        const phonemizerMap = {
            'en': this.englishPhonemizer,
            'es': this.spanishPhonemizer,
            'fr': this.frenchPhonemizer,
            'de': this.germanPhonemizer,
            'it': this.italianPhonemizer,
            'pt': this.portuguesePhonemizer
        };
        
        return phonemizerMap[language] || this.universalPhonemizer;
    }

    private generateAnalysisId(): string {
        return 'analysis_' + crypto.randomUUID();
    }
}`}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {question.title.includes('ElevenLabs') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                          <Server className="h-5 w-5 text-white" />
                        </div>
                        ElevenLabs API Specifications
                      </h2>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100">
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                  <MessageSquare className="h-4 w-4 text-purple-600" />
                                </div>
                                Voice Generation API
                              </h3>
                              <div className="space-y-4 text-sm">
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900">POST /api/v1/text-to-speech</span>
                                    <span className="text-green-600 text-xs font-medium">200 OK</span>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Content-Type:</span>
                                      <span className="font-mono text-xs">application/json</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Authorization:</span>
                                      <span className="font-mono text-xs">Bearer {`{token}`}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">Request Body:</p>
                                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{
  "text": "string",
  "voice_id": "string",
  "model_id": "eleven_monolingual_v1",
  "voice_settings": {
    "stability": 0.5,
    "similarity_boost": 0.75
  },
  "output_format": "mp3_44100_128"
}`}
                                  </pre>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">Response:</p>
                                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{
  "audio": "base64_encoded_audio",
  "metadata": {
    "duration": 2.5,
    "characters": 150,
    "model": "eleven_monolingual_v1"
  }
}`}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                                  <Database className="h-4 w-4 text-pink-600" />
                                </div>
                                Voice Management API
                              </h3>
                              <div className="space-y-4 text-sm">
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900">GET /api/v1/voices</span>
                                    <span className="text-green-600 text-xs font-medium">200 OK</span>
                                  </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">Response:</p>
                                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{
  "voices": [
    {
      "voice_id": "string",
      "name": "string",
      "category": "premade|custom|cloned",
      "description": "string",
      "labels": {
        "language": "en",
        "gender": "male"
      }
    }
  ]
}`}
                                  </pre>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-6 h-6 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                                  <FileIcon className="h-4 w-4 text-cyan-600" />
                                </div>
                                Voice Cloning API
                              </h3>
                              <div className="space-y-4 text-sm">
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900">POST /api/v1/voices/add</span>
                                    <span className="text-green-600 text-xs font-medium">200 OK</span>
                                  </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">Request Body:</p>
                                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{
  "name": "string",
  "description": "string",
  "files": ["audio_file_1.mp3"],
  "labels": {
    "language": "en",
    "gender": "female"
  }
}`}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Database Schemas */}
                  {question.title.includes('Perplexity') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                          <Database className="h-5 w-5 text-white" />
                        </div>
                        Perplexity Database Schemas
                      </h2>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Users Table</h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">id</span>
                                  <span className="text-gray-600">UUID PRIMARY KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">email</span>
                                  <span className="text-gray-600">VARCHAR(255) UNIQUE</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">password_hash</span>
                                  <span className="text-gray-600">VARCHAR(255)</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">created_at</span>
                                  <span className="text-gray-600">TIMESTAMP</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">last_login</span>
                                  <span className="text-gray-600">TIMESTAMP</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Documents Table</h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">id</span>
                                  <span className="text-gray-600">UUID PRIMARY KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">url</span>
                                  <span className="text-gray-600">TEXT UNIQUE</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">title</span>
                                  <span className="text-gray-600">VARCHAR(500)</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">content_hash</span>
                                  <span className="text-gray-600">VARCHAR(64)</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">index_type</span>
                                  <span className="text-gray-600">ENUM('news','web','papers','code')</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">created_at</span>
                                  <span className="text-gray-600">TIMESTAMP</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Search Queries Table</h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">id</span>
                                  <span className="text-gray-600">UUID PRIMARY KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">user_id</span>
                                  <span className="text-gray-600">UUID FOREIGN KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">query</span>
                                  <span className="text-gray-600">TEXT</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">response_time</span>
                                  <span className="text-gray-600">FLOAT</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">created_at</span>
                                  <span className="text-gray-600">TIMESTAMP</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Document Chunks Table</h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">id</span>
                                  <span className="text-gray-600">UUID PRIMARY KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">document_id</span>
                                  <span className="text-gray-600">UUID FOREIGN KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">content</span>
                                  <span className="text-gray-600">TEXT</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">embedding</span>
                                  <span className="text-gray-600">VECTOR(1536)</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">chunk_index</span>
                                  <span className="text-gray-600">INTEGER</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {question.title.includes('ChatGPT') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                          <Database className="h-5 w-5 text-white" />
                        </div>
                        ChatGPT Database Schemas
                      </h2>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Users Table</h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">id</span>
                                  <span className="text-gray-600">UUID PRIMARY KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">email</span>
                                  <span className="text-gray-600">VARCHAR(255) UNIQUE</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">subscription_tier</span>
                                  <span className="text-gray-600">ENUM('free','plus','pro')</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">created_at</span>
                                  <span className="text-gray-600">TIMESTAMP</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Conversations Table</h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">id</span>
                                  <span className="text-gray-600">UUID PRIMARY KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">user_id</span>
                                  <span className="text-gray-600">UUID FOREIGN KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">title</span>
                                  <span className="text-gray-600">VARCHAR(255)</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">model_used</span>
                                  <span className="text-gray-600">VARCHAR(50)</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">created_at</span>
                                  <span className="text-gray-600">TIMESTAMP</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Messages Table</h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">id</span>
                                  <span className="text-gray-600">UUID PRIMARY KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">conversation_id</span>
                                  <span className="text-gray-600">UUID FOREIGN KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">role</span>
                                  <span className="text-gray-600">ENUM('user','assistant','system')</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">content</span>
                                  <span className="text-gray-600">TEXT</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">tokens_used</span>
                                  <span className="text-gray-600">INTEGER</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">created_at</span>
                                  <span className="text-gray-600">TIMESTAMP</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Plugins Table</h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">id</span>
                                  <span className="text-gray-600">UUID PRIMARY KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">name</span>
                                  <span className="text-gray-600">VARCHAR(255)</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">description</span>
                                  <span className="text-gray-600">TEXT</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">api_endpoint</span>
                                  <span className="text-gray-600">VARCHAR(500)</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">is_active</span>
                                  <span className="text-gray-600">BOOLEAN</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {question.title.includes('Multimodal Pretraining') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                          <FileText className="h-5 w-5 text-white" />
                        </div>
                        Multimodal Pretraining - Comprehensive Q&A Guide
                      </h2>
                      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-100">
                        <div className="space-y-8">
                          {/* Q1 */}
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q1</span>
                              Why do we need vision encoders for multimodal pretraining?
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-gray-700 leading-relaxed">
                                In multimodal pretraining, we need to align text with images. Since transformers work on discrete tokens, we must convert images into a tokenized representation. Vision encoders (like ViT, VQ-VAE, or VQGAN) transform continuous image data into discrete embeddings (tokens), making it possible to use next-token prediction or contrastive objectives similar to text pretraining.
                              </p>
                            </div>
                          </div>

                          {/* Q2 */}
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q2</span>
                              How does a Vision Transformer (ViT) work, and how is it different from CNNs?
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <ul className="text-gray-700 leading-relaxed space-y-2">
                                <li><strong>ViT Process:</strong> ViT splits an image into N non-overlapping patches (e.g., 16×16).</li>
                                <li><strong>Embedding:</strong> Each patch is flattened and projected into a D-dimensional embedding.</li>
                                <li><strong>Transformer Processing:</strong> These embeddings are processed by a transformer with self-attention layers.</li>
                                <li><strong>Global Dependencies:</strong> Unlike CNNs, which capture local spatial features, ViTs capture global dependencies through self-attention.</li>
                                <li><strong>Scalability:</strong> As ViT scales, the advantage of CNN features diminishes—so large ViTs can directly operate on raw patches.</li>
                              </ul>
                            </div>
                          </div>

                          {/* Q3 */}
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q3</span>
                              What is CoCa (Contrastive Captioner), and what loss functions does it use?
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <ul className="text-gray-700 leading-relaxed space-y-2">
                                <li><strong>Combined Approach:</strong> CoCa combines contrastive loss (aligning image embeddings with text embeddings) and captioning loss (image-to-text generation).</li>
                                <li><strong>Training Strategy:</strong> In training, the lower layers of the decoder focus only on unimodal text representations (for contrastive loss), while cross-attention is applied at higher layers for captioning.</li>
                                <li><strong>CLS Token:</strong> A [CLS] token represents the text embedding for contrastive alignment.</li>
                              </ul>
                            </div>
                          </div>

                          {/* Q4 */}
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q4</span>
                              Explain VQ-VAE and why we use discrete latent variables.
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <ul className="text-gray-700 leading-relaxed space-y-2">
                                <li><strong>Encoding Process:</strong> VQ-VAE encodes images into a latent codebook of discrete variables.</li>
                                <li><strong>Nearest Neighbor:</strong> The encoder outputs are mapped to the nearest codebook vector.</li>
                                <li><strong>Training:</strong> Since this quantization step is non-differentiable, the straight-through estimator and codebook losses are used to train it.</li>
                                <li><strong>Benefits:</strong> Discrete latents allow us to use text-like next-token prediction losses for images, unifying language and vision modeling.</li>
                              </ul>
                            </div>
                          </div>

                          {/* Q5 */}
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q5</span>
                              How does VQGAN improve over VQ-VAE?
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <ul className="text-gray-700 leading-relaxed space-y-2">
                                <li><strong>GAN Integration:</strong> VQGAN integrates GAN loss (via a discriminator) in addition to reconstruction and codebook losses.</li>
                                <li><strong>Architecture:</strong> It uses a CNN encoder + decoder with a transformer modeling discrete tokens.</li>
                                <li><strong>Benefits:</strong> This combination improves both fidelity (GAN loss) and representation learning (transformer next-token prediction).</li>
                              </ul>
                            </div>
                          </div>

                          {/* Q6 */}
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q6</span>
                              What is ViT-VQGAN, and why is it used?
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <ul className="text-gray-700 leading-relaxed space-y-2">
                                <li><strong>Architecture:</strong> ViT-VQGAN replaces the CNN encoder/decoder with Vision Transformers.</li>
                                <li><strong>Tokenization:</strong> It tokenizes a 256×256 image into 32×32 discrete tokens.</li>
                                <li><strong>Factorized Codes:</strong> Uses factorized codes (decoupling lookup & embedding) to avoid dead entries in the codebook.</li>
                                <li><strong>Advantages:</strong> This yields better scalability and representation richness compared to CNN-based VQGAN.</li>
                              </ul>
                            </div>
                          </div>

                          {/* Q7 */}
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q7</span>
                              How does CLIP learn multimodal representations?
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <ul className="text-gray-700 leading-relaxed space-y-2">
                                <li><strong>Joint Training:</strong> CLIP trains image and text encoders jointly using a contrastive loss on (image, caption) pairs.</li>
                                <li><strong>Contrastive Learning:</strong> The model maximizes similarity for correct (image, caption) pairs and minimizes it for mismatched pairs.</li>
                                <li><strong>Zero-shot Transfer:</strong> This allows zero-shot transfer—images can be classified by comparing them with natural language prompts.</li>
                              </ul>
                            </div>
                          </div>

                          {/* Q8 */}
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q8</span>
                              What is unCLIP and how does it relate to image generation (e.g., DALL·E 2)?
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <ul className="text-gray-700 leading-relaxed space-y-2">
                                <li><strong>Extension:</strong> unCLIP extends CLIP for generative tasks.</li>
                                <li><strong>Conditioning:</strong> Instead of just aligning embeddings, unCLIP uses CLIP's text embedding to condition a diffusion model, enabling text-to-image synthesis.</li>
                                <li><strong>Applications:</strong> This powers models like DALL·E 2, where a text prompt guides image generation.</li>
                              </ul>
                            </div>
                          </div>

                          {/* Q9 */}
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q9</span>
                              What are the key losses in multimodal pretraining models like VQGAN and CoCa?
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <ul className="text-gray-700 leading-relaxed space-y-2">
                                <li><strong>Reconstruction loss:</strong> Ensures decoded image matches input.</li>
                                <li><strong>VQ loss / Codebook loss:</strong> Aligns encoder output with nearest codebook entry.</li>
                                <li><strong>GAN loss:</strong> Improves realism of generated images.</li>
                                <li><strong>Contrastive loss:</strong> Aligns image and text embeddings (CoCa, CLIP).</li>
                                <li><strong>Captioning loss:</strong> Ensures model can generate meaningful captions.</li>
                              </ul>
                            </div>
                          </div>

                          {/* Q10 */}
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q10</span>
                              How does Generative Pretraining from Pixels work?
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <ul className="text-gray-700 leading-relaxed space-y-2">
                                <li><strong>Downsampling:</strong> Images are downsampled (e.g., 32×32×3).</li>
                                <li><strong>Discretization:</strong> Pixels are discretized (either raw RGB values = 256 classes, or clustered into 512 IDs).</li>
                                <li><strong>Training:</strong> Then a transformer decoder is trained autoregressively (next-token prediction) or via masked language modeling.</li>
                                <li><strong>Sequence Treatment:</strong> This directly treats image data as a sequence, similar to text.</li>
                              </ul>
                            </div>
                          </div>

                          {/* Q11 */}
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">Q11</span>
                              What role do Diffusion Models play in image generation compared to VQGAN?
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <ul className="text-gray-700 leading-relaxed space-y-2">
                                <li><strong>VQGAN/Transformers:</strong> Rely on discrete token prediction.</li>
                                <li><strong>Diffusion Models:</strong> Learn to iteratively denoise Gaussian noise into a clean image, conditioned on text.</li>
                                <li><strong>Quality:</strong> They generally produce higher-quality, coherent images and are now state-of-the-art for text-to-image generation.</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {question.title.includes('ElevenLabs') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                          <Database className="h-5 w-5 text-white" />
                        </div>
                        ElevenLabs Database Schemas
                      </h2>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100">
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Users Table</h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">id</span>
                                  <span className="text-gray-600">UUID PRIMARY KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">email</span>
                                  <span className="text-gray-600">VARCHAR(255) UNIQUE</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">subscription_plan</span>
                                  <span className="text-gray-600">ENUM('free','starter','creator','pro')</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">characters_used</span>
                                  <span className="text-gray-600">BIGINT</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">created_at</span>
                                  <span className="text-gray-600">TIMESTAMP</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Voices Table</h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">id</span>
                                  <span className="text-gray-600">UUID PRIMARY KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">name</span>
                                  <span className="text-gray-600">VARCHAR(255)</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">category</span>
                                  <span className="text-gray-600">ENUM('premade','custom','cloned')</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">language</span>
                                  <span className="text-gray-600">VARCHAR(10)</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">model_id</span>
                                  <span className="text-gray-600">VARCHAR(100)</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">is_public</span>
                                  <span className="text-gray-600">BOOLEAN</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Audio Generations Table</h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">id</span>
                                  <span className="text-gray-600">UUID PRIMARY KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">user_id</span>
                                  <span className="text-gray-600">UUID FOREIGN KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">voice_id</span>
                                  <span className="text-gray-600">UUID FOREIGN KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">text_input</span>
                                  <span className="text-gray-600">TEXT</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">audio_url</span>
                                  <span className="text-gray-600">VARCHAR(500)</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">duration</span>
                                  <span className="text-gray-600">FLOAT</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">created_at</span>
                                  <span className="text-gray-600">TIMESTAMP</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Projects Table</h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">id</span>
                                  <span className="text-gray-600">UUID PRIMARY KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">user_id</span>
                                  <span className="text-gray-600">UUID FOREIGN KEY</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">name</span>
                                  <span className="text-gray-600">VARCHAR(255)</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">description</span>
                                  <span className="text-gray-600">TEXT</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">is_public</span>
                                  <span className="text-gray-600">BOOLEAN</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <span className="font-medium">created_at</span>
                                  <span className="text-gray-600">TIMESTAMP</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Class Diagrams */}
                  {question.title.includes('Perplexity') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                          <FileCode className="h-5 w-5 text-white" />
                        </div>
                        Perplexity Class Diagrams & Design Patterns
                      </h2>
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border border-orange-100">
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Search Service Classes</h3>
                              <div className="space-y-4 text-sm">
                                <div className="border border-gray-200 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">SearchService</p>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ search(query: string): Promise&lt;SearchResult&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ streamSearch(query: string): Observable&lt;SearchResult&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">- validateQuery(query: string): boolean</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">QueryOrchestrator</p>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ orchestrate(query: Query): Promise&lt;OrchestrationResult&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ classifyIntent(query: string): QueryIntent</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ selectIndexes(intent: QueryIntent): IndexType[]</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Retrieval Classes</h3>
                              <div className="space-y-4 text-sm">
                                <div className="border border-gray-200 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">RetrievalEngine</p>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ retrieve(query: string, indexes: IndexType[]): Promise&lt;Document[]&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ hybridSearch(query: string): Promise&lt;Document[]&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">- mergeResults(results: SearchResult[]): Document[]</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">LLMSynthesizer</p>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ synthesize(query: string, documents: Document[]): Promise&lt;Answer&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ streamSynthesize(query: string, documents: Document[]): Observable&lt;string&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">- generateCitations(answer: string, documents: Document[]): Citation[]</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {question.title.includes('ChatGPT') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                          <FileCode className="h-5 w-5 text-white" />
                        </div>
                        ChatGPT Class Diagrams & Design Patterns
                      </h2>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Chat Service Classes</h3>
                              <div className="space-y-4 text-sm">
                                <div className="border border-gray-200 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">ChatService</p>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ sendMessage(message: Message): Promise&lt;Response&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ streamResponse(conversationId: string): Observable&lt;string&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">- validateMessage(message: Message): boolean</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">ConversationManager</p>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ createConversation(userId: string): Promise&lt;Conversation&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ getConversation(id: string): Promise&lt;Conversation&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ updateContext(conversationId: string, context: Context): void</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">LLM & Memory Classes</h3>
                              <div className="space-y-4 text-sm">
                                <div className="border border-gray-200 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">LLMOrchestrator</p>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ generateResponse(messages: Message[]): Promise&lt;Response&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ selectModel(context: Context): ModelType</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">- buildPrompt(messages: Message[]): string</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">MemorySystem</p>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ storeMemory(conversationId: string, memory: Memory): void</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ retrieveContext(conversationId: string): Promise&lt;Context&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">- compressHistory(messages: Message[]): Context</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {question.title.includes('ElevenLabs') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                          <FileCode className="h-5 w-5 text-white" />
                        </div>
                        ElevenLabs Class Diagrams & Design Patterns
                      </h2>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100">
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Voice Generation Classes</h3>
                              <div className="space-y-4 text-sm">
                                <div className="border border-gray-200 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">VoiceGenerationService</p>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ generateVoice(request: VoiceRequest): Promise&lt;AudioResponse&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ streamGeneration(request: VoiceRequest): Observable&lt;AudioChunk&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">- validateRequest(request: VoiceRequest): boolean</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">VoiceModelManager</p>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ loadModel(voiceId: string): Promise&lt;VoiceModel&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ createCustomVoice(samples: AudioSample[]): Promise&lt;VoiceModel&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ cloneVoice(sourceAudio: AudioSample[]): Promise&lt;VoiceModel&gt;</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                              <h3 className="font-semibold text-gray-900 mb-4">Audio Processing Classes</h3>
                              <div className="space-y-4 text-sm">
                                <div className="border border-gray-200 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">AudioProcessor</p>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ processAudio(audio: AudioData): Promise&lt;ProcessedAudio&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ enhanceQuality(audio: AudioData): Promise&lt;AudioData&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">- convertFormat(audio: AudioData, format: Format): AudioData</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                  <p className="font-medium text-gray-900 mb-2">TextAnalyzer</p>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ analyzeText(text: string): Promise&lt;TextAnalysis&gt;</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ extractPhonemes(text: string): Phoneme[]</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">+ detectLanguage(text: string): Language</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Sequence Diagrams */}
                  {question.title.includes('Perplexity') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                          <Network className="h-5 w-5 text-white" />
                        </div>
                        Perplexity Sequence Steps & Flow
                      </h2>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                          <h3 className="font-semibold text-gray-900 mb-6">Search Request Flow</h3>
                          <div className="space-y-4">
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">Client sends search request</p>
                                <p className="text-sm text-gray-600">POST /api/v1/search with query and filters</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">API Gateway validates & routes</p>
                                <p className="text-sm text-gray-600">Authentication, rate limiting, request validation</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">Query Orchestrator processes</p>
                                <p className="text-sm text-gray-600">Intent classification, tool planning, query optimization</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">Parallel retrieval from indexes</p>
                                <p className="text-sm text-gray-600">BM25 + Vector search across selected indexes</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">5</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">LLM synthesis & streaming</p>
                                <p className="text-sm text-gray-600">Answer generation with citations, real-time streaming</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">6</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">Response delivery</p>
                                <p className="text-sm text-gray-600">Streamed response with metadata and sources</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {question.title.includes('ChatGPT') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                          <Network className="h-5 w-5 text-white" />
                        </div>
                        ChatGPT Sequence Steps & Flow
                      </h2>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                          <h3 className="font-semibold text-gray-900 mb-6">Chat Message Flow</h3>
                          <div className="space-y-4">
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">User sends message</p>
                                <p className="text-sm text-gray-600">POST /api/v1/chat/completions with conversation context</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">Conversation Manager processes</p>
                                <p className="text-sm text-gray-600">Thread management, context retrieval, history loading</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">LLM Orchestrator selects model</p>
                                <p className="text-sm text-gray-600">Model selection, prompt engineering, context window management</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">Memory System retrieves context</p>
                                <p className="text-sm text-gray-600">Context compression, knowledge retrieval, history analysis</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">5</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">Streaming response generation</p>
                                <p className="text-sm text-gray-600">Real-time token streaming, WebSocket delivery</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">6</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">Memory update & storage</p>
                                <p className="text-sm text-gray-600">Conversation persistence, context storage, usage tracking</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {question.title.includes('ElevenLabs') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                          <Network className="h-5 w-5 text-white" />
                        </div>
                        ElevenLabs Sequence Steps & Flow
                      </h2>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                          <h3 className="font-semibold text-gray-900 mb-6">Voice Generation Flow</h3>
                          <div className="space-y-4">
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">User submits text</p>
                                <p className="text-sm text-gray-600">POST /api/v1/text-to-speech with voice settings</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">Text Analysis & Processing</p>
                                <p className="text-sm text-gray-600">Language detection, phoneme extraction, prosody analysis</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">Voice Model Loading</p>
                                <p className="text-sm text-gray-600">Model selection, GPU allocation, voice parameter loading</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">Neural TTS Generation</p>
                                <p className="text-sm text-gray-600">Waveform synthesis, real-time streaming, quality enhancement</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">5</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">Audio Post-processing</p>
                                <p className="text-sm text-gray-600">Noise reduction, format conversion, quality optimization</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">6</div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">Storage & Delivery</p>
                                <p className="text-sm text-gray-600">S3 upload, CDN distribution, usage tracking</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Infrastructure & Deployment */}
                  {question.title.includes('Perplexity') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                          <Zap className="h-5 w-5 text-white" />
                        </div>
                        Perplexity Infrastructure & Deployment
                      </h2>
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-100">
                        <div className="grid lg:grid-cols-3 gap-6">
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                <Server className="h-4 w-4 text-blue-600" />
                              </div>
                              Search Service Container
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Dockerfile (Search API)</p>
                                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]`}
                                </pre>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Resource Limits</p>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">CPU:</span>
                                    <span className="font-medium">4 cores</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Memory:</span>
                                    <span className="font-medium">8GB</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">GPU:</span>
                                    <span className="font-medium">1x V100</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <Network className="h-4 w-4 text-green-600" />
                              </div>
                              Kubernetes Deployment
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Search Service Deployment</p>
                                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: perplexity-search
spec:
  replicas: 5
  selector:
    matchLabels:
      app: perplexity-search
  template:
    metadata:
      labels:
        app: perplexity-search
    spec:
      containers:
      - name: search-api
        image: perplexity-search:latest
        ports:
        - containerPort: 8000`}
                                </pre>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Auto-scaling</p>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Min replicas:</span>
                                    <span className="font-medium">5</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Max replicas:</span>
                                    <span className="font-medium">50</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">CPU threshold:</span>
                                    <span className="font-medium">70%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                <Shield className="h-4 w-4 text-purple-600" />
                              </div>
                              Search Monitoring
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Search Metrics</p>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Search latency p95:</span>
                                    <span className="font-medium">&lt; 2.5s</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Search accuracy:</span>
                                    <span className="font-medium">&gt; 94%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">QPS:</span>
                                    <span className="font-medium">10k+</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Alert Rules</p>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">High search latency:</span>
                                    <span className="font-medium">p95 &gt; 3s</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Low accuracy:</span>
                                    <span className="font-medium">&lt; 90%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Index health:</span>
                                    <span className="font-medium">ES cluster status</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {question.title.includes('ChatGPT') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                          <Zap className="h-5 w-5 text-white" />
                        </div>
                        ChatGPT Infrastructure & Deployment
                      </h2>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
                        <div className="grid lg:grid-cols-3 gap-6">
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <Server className="h-4 w-4 text-green-600" />
                              </div>
                              Chat Service Container
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Dockerfile (Chat API)</p>
                                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "chat_service:app", "--host", "0.0.0.0"]`}
                                </pre>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Resource Limits</p>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">CPU:</span>
                                    <span className="font-medium">8 cores</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Memory:</span>
                                    <span className="font-medium">16GB</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">GPU:</span>
                                    <span className="font-medium">2x A100</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                <Network className="h-4 w-4 text-blue-600" />
                              </div>
                              Kubernetes Deployment
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Chat Service Deployment</p>
                                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: chatgpt-chat
spec:
  replicas: 10
  selector:
    matchLabels:
      app: chatgpt-chat
  template:
    metadata:
      labels:
        app: chatgpt-chat
    spec:
      containers:
      - name: chat-api
        image: chatgpt-chat:latest
        ports:
        - containerPort: 8000`}
                                </pre>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Auto-scaling</p>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Min replicas:</span>
                                    <span className="font-medium">10</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Max replicas:</span>
                                    <span className="font-medium">100</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Memory threshold:</span>
                                    <span className="font-medium">80%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                <Shield className="h-4 w-4 text-purple-600" />
                              </div>
                              Chat Monitoring
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Chat Metrics</p>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Response time p95:</span>
                                    <span className="font-medium">&lt; 2.0s</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Concurrent sessions:</span>
                                    <span className="font-medium">1M+</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Token throughput:</span>
                                    <span className="font-medium">100k/s</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Alert Rules</p>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">High response time:</span>
                                    <span className="font-medium">p95 &gt; 3s</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Memory pressure:</span>
                                    <span className="font-medium">&gt; 90%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">GPU utilization:</span>
                                    <span className="font-medium">&lt; 50%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {question.title.includes('ElevenLabs') && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                          <Zap className="h-5 w-5 text-white" />
                        </div>
                        ElevenLabs Infrastructure & Deployment
                      </h2>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100">
                        <div className="grid lg:grid-cols-3 gap-6">
                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                <Server className="h-4 w-4 text-purple-600" />
                              </div>
                              Voice Service Container
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Dockerfile (Voice API)</p>
                                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`FROM pytorch/pytorch:2.0.0-cuda11.8
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "voice_service:app", "--host", "0.0.0.0"]`}
                                </pre>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Resource Limits</p>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">CPU:</span>
                                    <span className="font-medium">16 cores</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Memory:</span>
                                    <span className="font-medium">32GB</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">GPU:</span>
                                    <span className="font-medium">4x V100</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <div className="w-6 h-6 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                                <Network className="h-4 w-4 text-pink-600" />
                              </div>
                              Kubernetes Deployment
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Voice Service Deployment</p>
                                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: elevenlabs-voice
spec:
  replicas: 8
  selector:
    matchLabels:
      app: elevenlabs-voice
  template:
    metadata:
      labels:
        app: elevenlabs-voice
    spec:
      containers:
      - name: voice-api
        image: elevenlabs-voice:latest
        ports:
        - containerPort: 8000`}
                                </pre>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Auto-scaling</p>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Min replicas:</span>
                                    <span className="font-medium">8</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Max replicas:</span>
                                    <span className="font-medium">40</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">GPU threshold:</span>
                                    <span className="font-medium">85%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <div className="w-6 h-6 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                                <Shield className="h-4 w-4 text-cyan-600" />
                              </div>
                              Voice Monitoring
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Voice Metrics</p>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Generation time p95:</span>
                                    <span className="font-medium">&lt; 3.0s</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Concurrent users:</span>
                                    <span className="font-medium">10K+</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Audio quality:</span>
                                    <span className="font-medium">&gt; 95%</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-gray-900 mb-2">Alert Rules</p>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">High generation time:</span>
                                    <span className="font-medium">p95 &gt; 5s</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">GPU utilization:</span>
                                    <span className="font-medium">&lt; 60%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Audio quality:</span>
                                    <span className="font-medium">&lt; 90%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}


                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;