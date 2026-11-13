import { describe, expect, it } from 'vitest';
import { identity, education, projects, experience, pipelineStages, resumeAvailable, resume } from '../src/data/portfolio';
import { photos } from '../src/data/photoAssets';

describe('truth-preserving portfolio content', () => {
  it('preserves the ongoing student status and expected year', () => {
    expect(education.status).toBe('Currently pursuing');
    expect(education.expectedYear).toBe(2027);
    expect(education.cgpa).toBe('8.88');
    expect(identity.fullName).toBe('Rachamalli Renusarika');
  });
  it('uses only the supplied contact details', () => {
    expect(identity.email).toBe('renusarikarachamalli@gmail.com');
    expect(identity.phoneHref).toBe('tel:+917416597644');
    expect(identity.githubUrl).toBeNull();
    expect(identity.linkedinUrl).toBeNull();
  });
  it('preserves the two exact project identities without guessed repositories', () => {
    expect(projects.map(p=>p.title)).toEqual(['Reinforcement Learning for Intelligent Task Scheduling','GPU-Optimized Deep Learning Training Pipeline']);
    expect(projects.every(p=>p.repositoryUrl===null && p.demoUrl===null)).toBe(true);
  });
  it('does not turn Salesforce training into a Salesforce Inc. job', () => {
    expect(experience[0].organization).toBe('Salesforce CRM Training');
    expect(experience[0].duration).toBe('6 months · Semester 3-2');
    expect(experience[1].organization).toBe('CHV Apps');
  });
  it('uses all four distinct supplied images with descriptive text', () => {
    expect(new Set(Object.values(photos).map(p=>p.source)).size).toBe(4);
    expect(Object.values(photos).every(p=>p.alt.length>15)).toBe(true);
  });
  it('has six meaningful process stages and honest resume detection', () => {
    expect(pipelineStages).toHaveLength(6);
    expect(typeof resumeAvailable).toBe('boolean');
    expect(resume.expectedPath.endsWith('.pdf')).toBe(true);
  });
});
