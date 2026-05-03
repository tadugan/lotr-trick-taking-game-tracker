import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { Trash2, Plus, BookOpen, Upload } from 'lucide-react'
import { GAMES } from '../data/games'
import { useSaves } from '../lib/useSaves'
import { importSaveFromFile } from '../lib/transfer'
import type { SaveFile } from '../types'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const navigate = useNavigate()
  const { saves, deleteSave, refresh } = useSaves()
  const [importError, setImportError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const hasSaves = saves.length > 0

  function handleDelete(e: React.MouseEvent, save: SaveFile) {
    e.preventDefault()
    if (window.confirm(`Delete "${save.name}"? This cannot be undone.`)) {
      deleteSave(save.id)
    }
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!fileInputRef.current) return
    fileInputRef.current.value = ''
    if (!file) return

    setImportError(null)
    const result = await importSaveFromFile(file)
    if (result.ok) {
      refresh()
      navigate({ to: '/saves/$id', params: { id: result.save.id } })
    } else {
      setImportError(result.error)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Your saves</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 active:bg-gray-50"
            aria-label="Import save"
          >
            <Upload size={15} />
            Import
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImport}
            className="sr-only"
            aria-hidden="true"
          />
          <Link
            to="/saves/new"
            className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white active:bg-gray-700"
          >
            <Plus size={16} />
            New save
          </Link>
        </div>
      </div>

      {importError && (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {importError}
        </div>
      )}

      {!hasSaves ? (
        <EmptyState onImport={() => fileInputRef.current?.click()} />
      ) : (
        <div className="mt-6 space-y-6">
          {GAMES.map((game) => {
            const gameSaves = saves.filter((s) => s.gameId === game.id)
            if (gameSaves.length === 0) return null
            return (
              <section key={game.id}>
                <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {game.title}
                </h2>
                <ul className="space-y-2">
                  {gameSaves.map((save) => (
                    <li key={save.id}>
                      <SaveCard save={save} onDelete={handleDelete} />
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}

function SaveCard({
  save,
  onDelete,
}: {
  save: SaveFile
  onDelete: (e: React.MouseEvent, save: SaveFile) => void
}) {
  const completed = save.chapters.filter((c) => c.completed).length
  const total = save.chapters.length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const isComplete = total > 0 && completed === total

  return (
    <Link
      to="/saves/$id"
      params={{ id: save.id }}
      className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 active:bg-gray-50"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate font-medium text-gray-900">{save.name}</span>
        {save.players.length > 0 && (
          <span className="truncate text-xs text-gray-500">
            {save.players.join(', ')}
          </span>
        )}
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full transition-all ${isComplete ? 'bg-green-500' : 'bg-gray-900'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">
            {completed} / {total}
            {isComplete && ' · Complete!'}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => onDelete(e, save)}
        className="shrink-0 rounded-lg p-3.5 text-gray-400 active:text-red-500"
        aria-label={`Delete ${save.name}`}
      >
        <Trash2 size={18} />
      </button>
    </Link>
  )
}

function EmptyState({ onImport }: { onImport: () => void }) {
  return (
    <div className="mt-16 flex flex-col items-center gap-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
        <BookOpen size={28} className="text-gray-400" />
      </div>
      <div>
        <p className="font-medium text-gray-900">No saves yet</p>
        <p className="mt-1 text-sm text-gray-500">
          Create your first save file to start tracking your adventure.
        </p>
      </div>
      <div className="mt-2 flex flex-col items-center gap-2">
        <Link
          to="/saves/new"
          className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white active:bg-gray-700"
        >
          <Plus size={16} />
          Create first save
        </Link>
        <button
          type="button"
          onClick={onImport}
          className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-500 active:text-gray-900"
        >
          <Upload size={15} />
          Import a save file
        </button>
      </div>
    </div>
  )
}
