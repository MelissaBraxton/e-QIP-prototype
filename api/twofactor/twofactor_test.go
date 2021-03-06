package twofactor

import (
	"encoding/base32"
	"os"
	"testing"
)

var tests = []struct {
	secret  []byte
	account string
	token   string
	base64  string
}{
	{[]byte("secret"), "bryan", "814628", "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"},
	{[]byte("702387654342348"), "paul", "525516", "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"},
	{[]byte("⌘⌘⌘⌘⌘"), "alan", "63750", "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAFbElEQVR4nOzdzW7jNhhA0bqY93/ldF91oRL8c+45eyvxDC6IfKDIPz8/P39B1d+nfwE4SQCkCYA0AZAmANIEQJoASBMAaQIgTQCkCYA0AZAmANIEQJoASBMAaQIgTQCkCYA0AZAmANIEQJoASBMAaQIgTQCkCYA0AZD2Z9FzP5/Poie/8Tzx9/n7rDsVeOxnvfkXG3vOrG962//pFFYA0gRAmgBIEwBpAiBt1RToaefUZexTb2ZHs4zNfN78zmOfGpsd3fZ/OsAKQJoASBMAaQIgTQCk7ZsCPY39pT9r8jBryvHmW6zbHTTrU2f3Cx28rd0KQJoASBMAaQIgTQCknZwC7TRr98us963GdvW8eQ7/ixWANAGQJgDSBECaAEirTIHWvRW1zqwJz9nThC5nBSBNAKQJgDQBkCYA0k5OgXbOGcbO/Dn7JtfY7zzrU2O+bnZkBSBNAKQJgDQBkCYA0vZNgc6+uzRrL9CsU5TX/T5vrHs/7utYAUgTAGkCIE0ApAmAtM/Xbd6Y5ex97m/s/FlZVgDSBECaAEgTAGkCIG3VXqD795asm/mcPXf6zZOfdn6Lq+4RswKQJgDSBECaAEgTAGm33xQ/6wausU+tm3u8uRHsd+wFumrm82QFIE0ApAmANAGQJgDS7rojbN1+oVmnQ8+y86b4Wbtxzv4se4FgPgGQJgDSBECaAEhbNQVadx7ybW9yrTPrW8z6XrM+ddUeJysAaQIgTQCkCYA0AZB28nToszdMzXrXbNbulzfW/c5jz3lad5aRvUAwnwBIEwBpAiBNAKTddTr0mJ0nG1++s2Xpm2473/ayFwh2EABpAiBNAKQJgLST5wLNmqjsnDjNmvnMej9u5z6f++99G2AFIE0ApAmANAGQJgDSVr0Rtm5aMus5t51EffZtr1lmzXzsBYIdBECaAEgTAGkCIG3f6dBP686C3jlfOuu2WdbZJw+wApAmANIEQJoASBMAaXfdFD9m3d6bs+c8r7uZ/bb9Qgff8rMCkCYA0gRAmgBIEwBpJ0+HXneq89POPTOznvzG2ETl8rN6drICkCYA0gRAmgBIEwBp+/YCrZsLjc091k2lxsyazNx2n/vlEycrAGkCIE0ApAmANAGQtu9coJ1TjrHn7Dyf+XecsfPmm15+tpIVgDQBkCYA0gRAmgBI2/dG2Nin1r01NjY/WXfD+9PO8452fos33BEGOwiANAGQJgDSBEDavjfCZs0Z1r23NWvysG5a8nXvW/2ndecvDbACkCYA0gRAmgBIEwBp33dH2LqzaGbtz5l13/2bnz7rLbZ1nxpjLxDsIADSBECaAEgTAGknT4de9+SdN4vNcnafz6+c8LxhBSBNAKQJgDQBkCYA0j5X/Um+zrrThMZ++hvrbvJa99N3vsE3hRWANAGQJgDSBECaAEi763ToWXZOFcZmGt94j9i6PVcH50JWANIEQJoASBMAaQIg7eTp0LPc9ubUuv0w627yemPd/6C9QHCGAEgTAGkCIE0ApJ08Hfr+96Ru21O0c8/M2dnRtm9qBSBNAKQJgDQBkCYA0r7vjrDb7JyWrNtTNGbWTiR7geAMAZAmANIEQJoASKtMgc7uq9m5f2nWVGrsBvz776D/FysAaQIgTQCkCYA0AZB2cgp09nqyWROMnTe877yhbOw5O0+9nsIKQJoASBMAaQIgTQCk7ZsCnf3bf2yCcXYuNGtKtvO86LEdRAdZAUgTAGkCIE0ApAmAtM9Vf5LDZlYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBp/wQAAP//R7G6MrbcMUQAAAAASUVORK5CYII="},
	{[]byte("000000"), "john", "343152", "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"},
	{[]byte("z.83234."), "jay", "562450", "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAFfElEQVR4nOzdUWotNxZA0XaT+U/59X9XIIWQjsrZa33bdW/82IgcVNJff/78+Q9U/ff2F4CbBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGl/HXruz8/PoSe/8Tzxd+37vHnOudOF1z7r3Df82r/pFlYA0gRAmgBIEwBpAiDt1BToaXJa8ubT30xL3jz53KevuftZu4xNnKwApAmANAGQJgDSBEDa3BToadf+nF2fdW6/0K6J09Ou37q7X+jibe1WANIEQJoASBMAaQIg7eYUaNK5vUBrn772W7u+89033T7FCkCaAEgTAGkCIE0ApFWmQOec22W0S2Ses8YKQJoASBMAaQIgTQCk3ZwCTU4nJmc1d6cud0+Q/nUTJysAaQIgTQCkCYA0AZA2NwW6ux/madf7Vp2fefrav+kCKwBpAiBNAKQJgDQBkPbz6zZv7LJ2fs6k7Fk9k6wApAmANAGQJgDSBEDaqSnQuf0nbz7rafLJ5+7JOvd9dv19dr2PNjYBswKQJgDSBECaAEgTAGmn3gibnPmcm5+cuzXsjXPnFL25y37tyU8f39FkBSBNAKQJgDQBkCYA0k5NgXZNMM7d5373bJw3T56cQa191tr3+dRcyApAmgBIEwBpAiBNAKTd3Au0axrw/bnQube0dv23n/uLrf3W2FzICkCaAEgTAGkCIE0ApN08F2jXk5/O7aKZnDit/dbkz7z5hm9cPKnbCkCaAEgTAGkCIE0ApM3dFP/0G/fMrDk383la+5nJv8+n7pe3ApAmANIEQJoASBMAaTenQE/n3sB6Onfmz67n3L1rbNeTPz6jswKQJgDSBECaAEgTAGlzU6Bd+0/u3k4+ee7N3RO2776zNsYKQJoASBMAaQIgTQCkfWsv0OQM4dwdWOfsOj37jXMnKa39zCFWANIEQJoASBMAaQIgbe506HPuTjl2+dreG6dDw7+fAEgTAGkCIE0ApJ2aAv3NJ/0rbg3b9SbX16Y3d128O94KQJoASBMAaQIgTQCkzb0RNrlL5Plbu6YKb54zeU/9rud87VygseGkFYA0AZAmANIEQJoASDs1BZr8f//feLPY5JnJn5q6/C17geAOAZAmANIEQJoASDs1BTo3z5mc+bx5zi6T/+2T7s6X/pEVgDQBkCYA0gRAmgBIm9sL9MbabpzJnS1f2zPztDZNWnvT7Y2LJz+/YQUgTQCkCYA0AZAmANLmTodec/deqjXnZjWTO6zeuHu+9xZWANIEQJoASBMAaQIg7eZN8V97m+n7Jxt//722Nz51TpEVgDQBkCYA0gRAmgBI+/peoF0mb+n6/h30u77P090TvxdYAUgTAGkCIE0ApAmAtG+dC7TL2sRg7fycteecu/N97bd23Wv2xqduKLMCkCYA0gRAmgBIEwBpp6ZAT5PvSe369F3viL2x63zmr50C9LW36v6PFYA0AZAmANIEQJoASJubAj197UTiyR0pu2Yjk1OpNWv3vo2xApAmANIEQJoASBMAaTenQHftOodn1zti597JWpsLnfv77NrRtIUVgDQBkCYA0gRAmgBIq0yBJnf+TO7YeTo34XnzhtrdfUcLrACkCYA0AZAmANIEQNrNKdDke0C7zqI5t6/m3Ok9a/uO3tg13fJGGNwhANIEQJoASBMAaXNToLu3hk3uBZqcC909U/rcOc/eCIMJAiBNAKQJgDQBkPZzcRsGXGcFIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQ9r8AAAD//16bAjufXhl+AAAAAElFTkSuQmCC"},
}

func TestSecret(t *testing.T) {
	first := Secret()
	if first == "" {
		t.Error("Secret should not be empty")
	}

	second := Secret()
	if second == "" {
		t.Error("Secret should not be empty")
	}
	if first == second {
		t.Error("Secret should be random on each call")
	}
}

func TestGenerate(t *testing.T) {
	for _, x := range tests {
		if png, err := Generate(x.account, base32.StdEncoding.EncodeToString(x.secret)); err == nil {
			if png != x.base64 {
				t.Errorf("Generation for %s (secret: %s) returned unexpected base64 of %s", x.account, x.secret, png)
			}
		}
	}
}

func TestAuthenticate(t *testing.T) {
	for _, x := range tests {
		if ok, err := Authenticate(x.token, base32.StdEncoding.EncodeToString(x.secret)); err == nil {
			if ok {
				t.Errorf("Authentication for %s (secret: %s) with token %s expected to pass", x.account, x.secret, x.token)
			}
		}
	}
}

func TestEmailSuccess(t *testing.T) {
	os.Clearenv()
	if err := os.Setenv("EQIP_SMTP_API_KEY", "SANDBOX_SUCCESS"); err != nil {
		t.Errorf("Failed to set EQIP_SMTP_API_KEY environment variable: %v", err)
	}

	if err := Email("test@mail.gov", base32.StdEncoding.EncodeToString([]byte("secret"))); err != nil {
		t.Errorf("Failed to send email: %v", err)
	}
}

func TestEmailError(t *testing.T) {
	os.Clearenv()
	if err := os.Setenv("EQIP_SMTP_API_KEY", "SANDBOX_ERROR"); err != nil {
		t.Errorf("Failed to set EQIP_SMTP_API_KEY environment variable: %v", err)
	}

	if err := Email("test@mail.gov", base32.StdEncoding.EncodeToString([]byte("secret"))); err == nil {
		t.Error("Expected an error but received none")
	}
}

func TestEmailCloudFoundry(t *testing.T) {
	os.Clearenv()
	if err := os.Setenv("VCAP_SERVICES", `{ "user-provided": [{ "credentials": { "api_key": "SANDBOX_SUCCESS" }, "label": "user-provided", "name": "eqip-smtp" }] }`); err != nil {
		t.Errorf("Failed to set VCAP_SERVICES environment variable: %v", err)
	}

	if err := Email("test@mail.gov", base32.StdEncoding.EncodeToString([]byte("secret"))); err != nil {
		t.Errorf("Failed to send email: %v", err)
	}
}
