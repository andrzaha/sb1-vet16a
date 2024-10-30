import cron from "node-cron";
import { z } from "zod";

interface Job {
  id: string;
  name: string;
  schedule: string;
  schema: string;
  batchSize: number;
  sourcePath: string;
  enabled: boolean;
}

const jobSchema = z.object({
  name: z.string().min(1),
  schedule: z.string().refine((val) => cron.validate(val)),
  schema: z.string().min(1),
  batchSize: z.number().min(1).max(1000),
  sourcePath: z.string().min(1),
});

export class SchedulerService {
  private jobs: Map<string, Job> = new Map();
  private tasks: Map<string, cron.ScheduledTask> = new Map();

  validateJob(jobConfig: Partial<Job>) {
    return jobSchema.parse(jobConfig);
  }

  scheduleJob(job: Job) {
    if (this.tasks.has(job.id)) {
      this.tasks.get(job.id)?.stop();
    }

    const task = cron.schedule(job.schedule, async () => {
      // Process batch of documents
      console.log(`Processing job ${job.name}`);
    });

    this.jobs.set(job.id, job);
    this.tasks.set(job.id, task);

    if (!job.enabled) {
      task.stop();
    }

    return job;
  }

  stopJob(jobId: string) {
    const task = this.tasks.get(jobId);
    if (task) {
      task.stop();
      return true;
    }
    return false;
  }

  getJobs() {
    return Array.from(this.jobs.values());
  }
}

export const schedulerService = new SchedulerService();