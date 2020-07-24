import { DATASET_EOCLOUD_LANDSAT5 } from './dataset';
import { AbstractSentinelHubV1OrV2WithCCLayer } from './AbstractSentinelHubV1OrV2WithCCLayer';
import { Link, LinkType } from './const';

export class Landsat5EOCloudLayer extends AbstractSentinelHubV1OrV2WithCCLayer {
  public readonly dataset = DATASET_EOCLOUD_LANDSAT5;

  public static makeLayer(
    layerInfo: any,
    instanceId: string,
    layerId: string,
    evalscript: string | null,
    evalscriptUrl: string | null,
    title: string | null,
    description: string | null,
  ): Landsat5EOCloudLayer {
    const maxCloudCoverPercent = layerInfo.settings.maxCC;
    return new Landsat5EOCloudLayer({
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
        target: tile.pathFragment,
        type: LinkType.EOCLOUD,
      },
      {
        target: `${tile.previewUrl.replace('eocloud', 'creodias')}.JPG`,
        type: LinkType.PREVIEW,
      },
    ];
  }

  protected extractFindTilesMeta(tile: any): Record<string, any> {
    return {
      ...super.extractFindTilesMeta(tile),
      sunElevation: tile.sunElevation,
    };
  }
}
