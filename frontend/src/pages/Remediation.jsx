import React, { useState } from 'react';
import { MOCK_TASKS } from '../mockData';
import { CalendarDays, LayoutTemplate, Clock, ShieldAlert } from 'lucide-react';

const PHASES = [
  { phase: 1, name: 'Critical Assets', timeline: 'Apr–Jul 2026', start: 0, width: 33, color: '#ef4444' },
  { phase: 2, name: 'High Priority', timeline: 'Aug–Oct 2026', start: 33, width: 25, color: '#f97316' },
  { phase: 3, name: 'Remaining', timeline: 'Nov 2026–Jan 2027', start: 58, width: 25, color: '#eab308' },
];

export default function Remediation() {
  const [view, setView] = useState('kanban');
  const pending = MOCK_TASKS.filter(t => t.status === 'pending');
  const inProgress = MOCK_TASKS.filter(t => t.status === 'in_progress');
  const completed = MOCK_TASKS.filter(t => t.status === 'completed');

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
        <div>
          <h1 className="page-title">Remediation Hub</h1>
          <p className="page-subtitle">PQC migration orchestration — 9-month roadmap to quantum safety</p>
        </div>
        <div style={{ display: 'flex', gap: 8, background: 'var(--bg-secondary)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-subtle)', width: 'fit-content' }}>
          <button 
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: '6px', border: 'none', background: view === 'kanban' ? 'var(--bg-card)' : 'transparent', color: view === 'kanban' ? 'var(--cyan)' : 'var(--text-muted)', cursor: 'pointer', fontSize: '13px', fontWeight: 600, transition: 'all 0.2s', boxShadow: view === 'kanban' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none' }} 
            onClick={() => setView('kanban')}
          >
            <LayoutTemplate size={14} /> Kanban Workflow
          </button>
          <button 
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: '6px', border: 'none', background: view === 'gantt' ? 'var(--bg-card)' : 'transparent', color: view === 'gantt' ? 'var(--cyan)' : 'var(--text-muted)', cursor: 'pointer', fontSize: '13px', fontWeight: 600, transition: 'all 0.2s', boxShadow: view === 'gantt' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none' }} 
            onClick={() => setView('gantt')}
          >
            <CalendarDays size={14} /> Gantt Timeline
          </button>
        </div>
      </div>

      {view === 'kanban' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' }}>
          <KanbanColumn title="Pending Validation" tasks={pending} color="#f59e0b" icon={<Clock size={16} color="#f59e0b" />} />
          <KanbanColumn title="In Progress" tasks={inProgress} color="#00c8ff" icon={<LayoutTemplate size={16} color="#00c8ff" />} />
          <KanbanColumn title="Completed / Safe" tasks={completed} color="#10b981" icon={<ShieldAlert size={16} color="#10b981" />} />
        </div>
      ) : (
        <div className="card">
          <div className="card-header"><span className="card-title">9-Month Migration Roadmap</span></div>
          <div className="card-body" style={{ padding: '24px' }}>
            
            {/* Timeline Header Map */}
            <div style={{ display: 'flex', marginBottom: 20, paddingLeft: 200, position: 'relative' }}>
              {['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'].map((month, index) => (
                <div key={month} style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', paddingBottom: 8, borderBottom: '1px solid var(--border-mid)', position: 'relative' }}>
                  {month}
                  <div style={{ position: 'absolute', bottom: -5, left: '50%', width: 1, height: 5, background: 'var(--border-mid)' }} />
                </div>
              ))}
            </div>

            {/* Gantt Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MOCK_TASKS.map(task => {
                const phase = PHASES.find(p => p.phase === task.phase);
                return (
                  <div key={task.taskId} style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', borderRadius: 6, border: '1px solid var(--border-subtle)', overflow: 'hidden', height: 44 }}>
                    <div style={{ width: 200, padding: '0 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgba(0,0,0,0.15)', borderRight: '1px solid var(--border-subtle)', height: '100%', flexShrink: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{task.taskId}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{task.assetId.split('.')[0]}</div>
                    </div>
                    <div style={{ flex: 1, position: 'relative', height: '100%', padding: '0 8px' }}>
                      <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: `calc(${phase?.start || 0}% + 8px)`, width: `calc(${phase?.width || 20}%)`, height: 24, background: `linear-gradient(90deg, ${phase?.color || '#6366f1'}33, ${phase?.color || '#6366f1'}11)`, border: `1px solid ${phase?.color || '#6366f1'}88`, borderRadius: 4, display: 'flex', alignItems: 'center', padding: '0 8px', fontSize: '10px', color: 'var(--text-primary)', transition: 'all 0.3s' }}>
                        {task.effortHours}h estimated effort
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ marginTop: 32, display: 'flex', gap: 24, justifyContent: 'center', borderTop: '1px solid var(--border-faint)', paddingTop: 16 }}>
              {PHASES.map(p => (
                <div key={p.phase} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <span style={{ width: 12, height: 12, borderRadius: 3, background: p.color, display: 'inline-block' }} />
                  Phase {p.phase}: {p.name}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

function KanbanColumn({ title, tasks, color, icon }) {
  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: 12, border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '16px', borderBottom: `2px solid ${color}44`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {icon}
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</span>
        </div>
        <span style={{ background: `${color}22`, color: color, fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: 10, border: `1px solid ${color}66` }}>
          {tasks.length}
        </span>
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 400 }}>
        {tasks.map(task => (
          <div key={task.taskId} className="card" style={{ padding: '16px', borderRadius: 8, borderLeft: `3px solid ${task.priority === 'critical' ? 'var(--critical)' : task.priority === 'high' ? 'var(--warning)' : color}`, cursor: 'grab', background: 'var(--bg-card)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
              <span className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: 4 }}>{task.taskId}</span>
              <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: task.priority === 'critical' ? 'var(--critical)' : task.priority === 'high' ? 'var(--warning)' : 'var(--text-secondary)' }}>
                {task.priority}
              </span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.4 }}>{task.title}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px dashed var(--border-subtle)', paddingTop: 12 }}>
              <span style={{ color: 'var(--cyan)' }}>{task.assetId.split('.')[0]}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={10} /> {task.dueDate.slice(5)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
