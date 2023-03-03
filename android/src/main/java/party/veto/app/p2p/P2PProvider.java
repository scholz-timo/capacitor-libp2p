package party.veto.app.p2p;

import android.util.Log;

public class P2PProvider {
    public String echo(String value) {
        Log.i("Echo", value);
        return value;
    }
}
