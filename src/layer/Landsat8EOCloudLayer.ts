import { DATASET_EOCLOUD_LANDSAT8 } from 'src/layer/dataset';
import { AbstractSentinelHubV1OrV2WithCCLayer } from 'src/layer/AbstractSentinelHubV1OrV2WithCCLayer';
import { Link } from 'src/layer/const';

export class Landsat8EOCloudLayer extends AbstractSentinelHubV1OrV2WithCCLayer {
  public readonly dataset = DATASET_EOCLOUD_LANDSAT8;

  public static makeLayer(
    layerInfo: any,
    instanceId: string,
    layerId: string,
    evalscript: string | null,
    evalscriptUrl: string | null,
    title: string | null,
    description: string | null,
  ): Landsat8EOCloudLayer {
    const maxCloudCoverPercent = layerInfo.settings.maxCC;
    return new Landsat8EOCloudLayer({
      instanceId,
      layerId,
      evalscript,
      evalscriptUrl,
      title,
      description,
      maxCloudCoverPercent,
    });
  }

  protected getTileLinks(tile: Record<string, any>): Link[] {
    return [
      {
        href: tile.pathFragment,
        rel: 'self',
        title: 'EOCloudPath',
      },
      {
        href: `https://finder.creodias.eu/files${tile.pathFragment.replace('/eodata', '')}.png`,
        rel: 'self',
        title: 'Preview',
      },
    ];
  }

  protected extractFindTilesMeta(tile: any): Record<string, any> {
    return {
      cloudCoverPercent: tile.cloudCoverPercentage,
      sunElevation: tile.sunElevation,
    };
  }
}
