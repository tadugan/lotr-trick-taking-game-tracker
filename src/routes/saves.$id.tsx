import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Check, Pencil, Download } from 'lucide-react'
import { getGame } from '../data/games'
import { getSave } from '../lib/storage'
import { useSaves } from '../lib/useSaves'
import { exportSave } from '../lib/transfer'
import type { SaveFile, Chapter } from '../types'

export const Route = createFileRoute('/saves/$id')({
  head: () => ({ meta: [{ title: 'LotR Trick-Taking Tracker' }] }),
  component: SaveDetail,
})

function SaveDetail() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const { saves, updateSave } = useSaves()

  const save = saves.find((s) => s.id === id)

  // Redirect to home if save not found (only after saves have loaded)
  const loaded = useRef(false)
  useEffect(() => {
    if (!loaded.current) {
      // First render after mount — check directly from storage
      if (!getSave(id)) navigate({ to: '/' })
      loaded.current = true
    }
  }, [id, navigate])

  const game = save ? getGame(save.gameId) : undefined

  useEffect(() => {
    if (save) document.title = `${save.name} — LotR Tracker`
    return () => { document.title = 'LotR Trick-Taking Tracker' }
  }, [save?.name])

  if (!save || !game) return null

  const completed = save.chapters.filter((c) => c.completed).length
  const total = save.chapters.length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const isComplete = total > 0 && completed === total

  function toggleChapter(chapterNumber: number) {
    const updated: SaveFile = {
      ...save!,
      chapters: save!.chapters.map((c) =>
        c.chapterNumber === chapterNumber ? { ...c, completed: !c.completed } : c,
      ),
    }
    updateSave(updated)
  }

  function renameSave(newName: string) {
    updateSave({ ...save!, name: newName })
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
          {game.title}
        </span>
        <button
          type="button"
          onClick={() => exportSave(save)}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-500 active:bg-gray-100"
          aria-label="Export save"
        >
          <Download size={13} />
          Export
        </button>
      </div>
      <SaveTitle name={save.name} onRename={renameSave} />

      {/* Players */}
      {save.players.length > 0 && (
        <p className="mt-1 text-sm text-gray-500">{save.players.join(', ')}</p>
      )}

      {/* Progress */}
      <div className="mt-4 flex flex-col gap-1.5">
        <div className="flex justify-between text-xs text-gray-500">
          <span>{isComplete ? 'All chapters complete!' : 'Progress'}</span>
          <span>
            {completed} / {total}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all duration-300 ${isComplete ? 'bg-green-500' : 'bg-gray-900'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Chapter list */}
      <ul className="mt-6 flex flex-col gap-2">
        {game.chapters.map((chapter) => {
          const progress = save.chapters.find(
            (c) => c.chapterNumber === chapter.number,
          )
          return (
            <li key={chapter.number}>
              <ChapterRow
                chapter={chapter}
                completed={progress?.completed ?? false}
                onToggle={() => toggleChapter(chapter.number)}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function SaveTitle({
  name,
  onRename,
}: {
  name: string
  onRename: (name: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(name)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.select()
  }, [editing])

  // Keep draft in sync if parent name changes (e.g. after save)
  useEffect(() => {
    if (!editing) setDraft(name)
  }, [name, editing])

  function commit() {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== name) onRename(trimmed)
    else setDraft(name)
    setEditing(false)
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        maxLength={40}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit()
          if (e.key === 'Escape') { setDraft(name); setEditing(false) }
        }}
        className="w-full rounded-lg border border-gray-900 px-2 py-0.5 text-xl font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-1"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className="group flex items-center gap-2 text-left"
      aria-label="Rename save"
    >
      <h1 className="text-xl font-semibold text-gray-900">{name}</h1>
      <Pencil
        size={14}
        className="shrink-0 text-gray-300 transition-colors group-active:text-gray-600"
      />
    </button>
  )
}

function ChapterRow({
  chapter,
  completed,
  onToggle,
}: {
  chapter: Chapter
  completed: boolean
  onToggle: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`overflow-hidden rounded-xl border transition-colors ${
        completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
      }`}
    >
      {/* Main row */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Completion toggle */}
        <button
          type="button"
          onClick={onToggle}
          aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
          className="flex h-11 w-11 shrink-0 items-center justify-center"
        >
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${
              completed
                ? 'border-green-500 bg-green-500 text-white'
                : 'border-gray-300 bg-white text-transparent'
            }`}
          >
            <Check size={12} strokeWidth={3} />
          </div>
        </button>

        {/* Chapter info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`font-medium ${completed ? 'text-green-800' : 'text-gray-900'}`}
            >
              {chapter.name}
            </span>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                chapter.victoryCondition === 'long'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {chapter.victoryCondition === 'long' ? 'Long' : 'Short'}
            </span>
          </div>
        </div>

        {/* Expand toggle */}
        <button
          type="button"
          onClick={() => setExpanded((x) => !x)}
          aria-label={expanded ? 'Hide characters' : 'Show characters'}
          className="shrink-0 rounded-lg p-3.5 text-gray-400 active:text-gray-600"
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Expandable character list */}
      {expanded && (
        <div
          className={`border-t px-4 py-3 ${
            completed ? 'border-green-200' : 'border-gray-100'
          }`}
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
            Characters
          </p>
          <ul className="flex flex-wrap gap-2">
            {chapter.characters.map((char) => (
              <li
                key={char.name}
                className={`rounded-full px-3 py-1 text-sm ${
                  char.required
                    ? 'bg-gray-900 font-medium text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {char.name}
                {char.required && (
                  <span className="ml-1 text-xs opacity-70">required</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
