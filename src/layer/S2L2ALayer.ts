import { DATASET_S2L2A } from 'src/layer/dataset';
import { AbstractSentinelHubV3WithCCLayer } from './AbstractSentinelHubV3WithCCLayer';
import { ProcessingPayload } from 'src/layer/processing';

export class S2L2ALayer extends AbstractSentinelHubV3WithCCLayer {
  public readonly dataset = DATASET_S2L2A;

  protected async updateProcessingGetMapPayload(payload: ProcessingPayload): Promise<ProcessingPayload> {
    payload.input.data[0].dataFilter.maxCloudCoverage = this.maxCloudCoverPercent;
    return payload;
  }
}
