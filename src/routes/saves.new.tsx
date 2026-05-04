import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Plus, X } from 'lucide-react'
import { GAMES } from '../data/games'
import { createSave } from '../lib/storage'
import type { Game } from '../types'

export const Route = createFileRoute('/saves/new')({
  component: NewSave,
})

const MAX_NAME_LENGTH = 40
const MAX_PLAYER_NAME_LENGTH = 30
const MAX_PLAYERS = 4

function NewSave() {
  const navigate = useNavigate()
  useEffect(() => { document.title = 'New Save — LotR Tracker' }, [])
  const [gameId, setGameId] = useState<Game['id'] | ''>('')
  const [name, setName] = useState('')
  const [players, setPlayers] = useState<string[]>([])
  const [errors, setErrors] = useState<{ gameId?: string; name?: string }>({})

  function validate() {
    const next: typeof errors = {}
    if (!gameId) next.gameId = 'Select a game.'
    if (!name.trim()) next.name = 'Enter a name for this save.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    const save = createSave(gameId as Game['id'], name, players)
    navigate({ to: '/saves/$id', params: { id: save.id } })
  }

  function addPlayer() {
    if (players.length < MAX_PLAYERS) setPlayers([...players, ''])
  }

  function updatePlayer(index: number, value: string) {
    setPlayers(players.map((p, i) => (i === index ? value : p)))
  }

  function removePlayer(index: number) {
    setPlayers(players.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">New save</h1>
      <p className="mt-1 text-sm text-gray-500">
        Choose a game and give this save file a name.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-6">
        {/* Game selector */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-gray-700">Game</legend>
          <div className="flex flex-col gap-2">
            {GAMES.map((game) => {
              const selected = gameId === game.id
              const disabled = !game.released
              return (
                <label
                  key={game.id}
                  className={[
                    'flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors',
                    disabled
                      ? 'cursor-not-allowed border-gray-100 bg-gray-50 opacity-60'
                      : selected
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 bg-white active:bg-gray-50',
                  ].join(' ')}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className={`font-medium ${selected ? 'text-white' : 'text-gray-900'}`}>
                      {game.title}
                    </span>
                    {disabled && (
                      <span className="text-xs text-gray-400">Coming soon</span>
                    )}
                  </div>
                  <input
                    type="radio"
                    name="gameId"
                    value={game.id}
                    checked={selected}
                    disabled={disabled}
                    onChange={() => {
                      setGameId(game.id)
                      setErrors((e) => ({ ...e, gameId: undefined }))
                    }}
                    className="sr-only"
                  />
                  <div
                    className={[
                      'h-4 w-4 shrink-0 rounded-full border-2',
                      selected ? 'border-white bg-white' : 'border-gray-300',
                    ].join(' ')}
                  >
                    {selected && (
                      <div className="m-auto mt-0.5 h-2 w-2 rounded-full bg-gray-900" />
                    )}
                  </div>
                </label>
              )
            })}
          </div>
          {errors.gameId && (
            <p className="mt-1.5 text-sm text-red-500">{errors.gameId}</p>
          )}
        </fieldset>

        {/* Save name */}
        <div>
          <label htmlFor="save-name" className="mb-2 block text-sm font-medium text-gray-700">
            Save name
          </label>
          <input
            id="save-name"
            type="text"
            value={name}
            maxLength={MAX_NAME_LENGTH}
            placeholder="e.g. Friday night group"
            onChange={(e) => {
              setName(e.target.value)
              if (e.target.value.trim()) {
                setErrors((err) => ({ ...err, name: undefined }))
              }
            }}
            className={[
              'w-full rounded-xl border px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400',
              'focus:ring-2 focus:ring-gray-900 focus:ring-offset-1',
              errors.name ? 'border-red-400' : 'border-gray-200',
            ].join(' ')}
          />
          <div className="mt-1 flex justify-between">
            {errors.name ? (
              <p className="text-sm text-red-500">{errors.name}</p>
            ) : (
              <span />
            )}
            <span className="text-xs text-gray-400">
              {name.length} / {MAX_NAME_LENGTH}
            </span>
          </div>
        </div>

        {/* Players */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Players
              <span className="ml-1 font-normal text-gray-400">(optional)</span>
            </span>
            <span className="text-xs text-gray-400">{players.length} / {MAX_PLAYERS}</span>
          </div>

          {players.length > 0 && (
            <ul className="mb-2 flex flex-col gap-2">
              {players.map((player, index) => (
                <li key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={player}
                    maxLength={MAX_PLAYER_NAME_LENGTH}
                    placeholder={`Player ${index + 1}`}
                    onChange={(e) => updatePlayer(index, e.target.value)}
                    className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 focus:ring-offset-1"
                  />
                  <button
                    type="button"
                    onClick={() => removePlayer(index)}
                    className="shrink-0 rounded-lg p-3.5 text-gray-400 active:text-red-500"
                    aria-label={`Remove player ${index + 1}`}
                  >
                    <X size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {players.length < MAX_PLAYERS && (
            <button
              type="button"
              onClick={addPlayer}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-300 py-3 text-sm text-gray-500 active:border-gray-400 active:text-gray-700"
            >
              <Plus size={15} />
              Add player
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            type="submit"
            className="w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white active:bg-gray-700"
          >
            Create save
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: '/' })}
            className="w-full rounded-xl py-3 text-sm font-medium text-gray-500 active:text-gray-900"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
